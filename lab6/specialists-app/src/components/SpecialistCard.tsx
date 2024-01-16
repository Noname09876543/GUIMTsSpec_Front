import { FC, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import './SpecialistCard.css'
import { Button } from 'react-bootstrap'
import { add_spec } from '../modules/get-specialist'
import { getServiceRequest, setNum } from '../specialists_store/specialistsSlice';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../specialists_store/specialists_store'
import { delete_spec } from '../modules/get-specialist'
import type { AppDispatch } from '../specialists_store/specialists_store'

interface Props {
    id: Number
    name: string
    desc: string
    preview_image: string
}


const default_image = require('../assets/noImage.jpg');

const SpecialistCard: FC<Props> = ({id, name, desc, preview_image}) => {

    const dispatch = useDispatch<AppDispatch>();

    const [loading, setLoading] = useState(false)

    const specialists_in_request = useSelector((state: RootState) => state.specialists.specialists)

    const checkSpecInRequest = (idParam: Number) => specialists_in_request.some(({id}) => id == idParam)

    const add_spec_to_request = async (id: Number) =>{
        let result = await add_spec(Number(id))
        dispatch(setNum(result.specialist.length))
        dispatch(getServiceRequest())
        // localStorage.setItem("specialistsNum", (result.specialist.length).toString())
    }

    const delete_spec_from_request = async (id: Number) =>{
        await setLoading(true)
        let result = await delete_spec(Number(id))
        dispatch(setNum(result.specialist.length))
        dispatch(getServiceRequest())
        // localStorage.setItem("specialistsNum", (result.specialist.length).toString())
        await setLoading(false)
    }


    return (
        <div className={`container ${loading && 'containerLoading'}`}>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            <Card className="card">
                <Card.Img className="cardImage" variant="top" src={preview_image+""} height={100} width={100} 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src=default_image;
                }} />
                <Card.Body>                
                    <div className="textStyle">
                        <Card.Title>{name}</Card.Title>
                    </div>
                    <div className="textStyle">
                        <Card.Text>
                            {desc}
                        </Card.Text>
                    </div>
                    {!checkSpecInRequest(id) && localStorage.getItem('username') && <Button onClick={(e) => {
                            e.stopPropagation();
                            add_spec_to_request(id);
                        }
                        } 
                    className='cardButton'>Добавить в заявку</Button>}
                    {checkSpecInRequest(id) && localStorage.getItem('username') && <Button onClick={(e) => {
                            e.stopPropagation();
                            delete_spec_from_request(id);
                        }
                        } 
                    className='deleteCardButton'>Удалить из заявки</Button>}
                </Card.Body>
            </Card>
        </div>
    )
} 

export default SpecialistCard;