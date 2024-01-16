import { FC, useState, useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import './SmallSpecialistCard.css'
import { Button } from 'react-bootstrap'
import { delete_spec } from '../modules/get-specialist'
import { useDispatch } from 'react-redux'
import { setNum } from '../specialists_store/specialistsSlice';

interface Props {
    id: Number,
    name: string
    preview_image: string
}

const default_image = require('../assets/noImage.jpg');

const SpecialistCardInRequest: FC<Props> = ({id, name, preview_image}) =>{

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const [delCard, setDelCard] = useState(false)

    const delete_spec_from_request = async (id: Number) =>{
        await setLoading(true)
        let result = await delete_spec(Number(id))
        dispatch(setNum(result.specialist.length))
        localStorage.setItem("specialistsNum", (result.specialist.length).toString())
        setDelCard(true)
        await setLoading(false)
    }

    useEffect(() => {

        // Этот код выполнится на mount`е компонента
              
        return () => {
          // Этот код выполнится на unmount`е компонента
        }
      
        // Это список зависимостей хука, он будет вызван каждый раз, когда зависимости будут меняться
      }, [])

    if (!delCard){
        return (
            <div className={` ${loading && 'containerLoading'}`}>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            <Card className="card">
                <Card.Img className="cardImage" variant="top" src={preview_image+""} height={100} width={100}  
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src=default_image;
                  }}
                  />
                <Card.Body>                
                    <div className="textStyle">
                        <Card.Title>{name}
                        </Card.Title>
                    </div>
                    {localStorage.getItem('username') && <Button onClick={(e) => {
                            e.stopPropagation();
                            delete_spec_from_request(id);
                        }
                        } 
                    className='deleteCardButton'>Удалить</Button>}
                </Card.Body>
            </Card>
            </div>
        )
    }
 
} 

export default SpecialistCardInRequest;