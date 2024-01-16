import { FC, useState, useEffect} from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { IModeratorRightsRequest, getModeratorRightsRequests, grantModeratorRights } from './modules/moderator_rights_requests'
import './SpecialistPage.css'
import './AdditionalStyle.css'

const ModeratorRequestsPage: FC = () => {

    const [loading, setLoading] = useState(false)

    const [moderatorRequestsList, setModeratorReightsRequests] = useState<IModeratorRightsRequest[]>([])

    const [infoMessage, setMessage] = useState('')


    const loadModeratorRightsRequests = async () =>{
        await setLoading(true)
        const { moderator_rights_requests } = await getModeratorRightsRequests()
        console.log(moderator_rights_requests)
        await setLoading(false)
        if (moderator_rights_requests != undefined){
            await setModeratorReightsRequests(moderator_rights_requests)
            setMessage("")
        } else {
            setMessage("Вы не авторизованы как модератор и не можете просмотреть список запросов!")
        }
    }

    const grant_rights = (id: number) => async () => {
        await grantModeratorRights(id)
        loadModeratorRightsRequests()
    };
    

    useEffect(() => {
        loadModeratorRightsRequests()
        // Этот код выполнится на mount`е компонента
              
        return () => {
          // Этот код выполнится на unmount`е компонента
        }
      
        // Это список зависимостей хука, он будет вызван каждый раз, когда зависимости будут меняться
      }, [])

    return (
        
        <div className={`container ${loading && 'containerLoading'}`}>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
                <Breadcrumb.Item href="/moderator_requests/" active>Запросы на права модератора</Breadcrumb.Item>
            </Breadcrumb>

            <h2>{infoMessage}</h2>

            <Row xs={4} md={4} className="g-4">
                {moderatorRequestsList.map((item, index)=> (
                    <Col key={index}>
                        <Card className="card">
                            <Card.Body>                
                                <div className="textStyle">
                                    <Card.Title>{item.username}</Card.Title>
                                </div>
                            </Card.Body>
                            <Button onClick={grant_rights(item.id)}>Дать права модератора</Button>
                            {/* <Button onClick={reject_request}>Отклонить заявку</Button> */}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ModeratorRequestsPage