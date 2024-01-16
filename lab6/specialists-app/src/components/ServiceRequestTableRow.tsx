import { FC, useState } from 'react'
import { Card } from 'react-bootstrap'
import { IServiceRequest, cancel_service_request, delete_service_request, finish_service_request, form_service_request } from '../modules/get-service_requests';
import { Col, Row } from 'react-bootstrap'
import SpecialistCardInRequest from './SpecialistCardInRequest'
import SpecialistCardInRequestWithButton from './SpecialistCardInRequestWithButton'
import { Button } from 'react-bootstrap'
import './ServiceRequestCard.css'


const redirect = () => {
    window.location.href = '/service_requests'
 }

const delete_request = async (id: Number) =>{
    await delete_service_request(Number(id))
    redirect()
}


const form_request = async (id: Number) =>{
    await form_service_request(Number(id))
    redirect()
}




const ServiceRequestTableRow: FC<IServiceRequest> = ({id, creator, comment, status, specialist, created_at, formed_at, finished_at}) => {

    const [loading, setLoading] = useState(false)

    const [requestStatus, setRequestStatus] = useState('');

    const [requestFinishedDate, setRequestFinishedDate] = useState('');



    const finish_request = async (id: Number) =>{
        await setLoading(true)
        const {status, finished_at} = await finish_service_request(Number(id))
        setRequestStatus(status)
        setRequestFinishedDate(finished_at)
        await setLoading(false)
    }

    const cancel_request = async (id: Number) =>{
        await setLoading(true)
        const {status} = await cancel_service_request(Number(id))
        setRequestStatus(status)
        await setLoading(false)
    }

    if (localStorage.getItem('role') == "moderator"){
        return ( 
            <tr className={`${loading && 'containerLoading'}`} >
                        {/* {specialist.map((item, index)=> (
                            <Col key={index}>
                                    {status=="CREATED" ? <SpecialistCardInRequestWithButton {...item} />:  <SpecialistCardInRequest {...item} />}
                            </Col>
                        ))} */}
                    <td>{id.toString()}</td>
                    <td>{creator}</td>
                    <td>{comment}</td>
                    <td>{requestStatus!="" ? requestStatus : status}</td>
                    <td>
                        {specialist.map(({id, name}) => {
                            return (
                                <p key={Number(id)}>{name}</p>
                            );
                        })}
                    </td>
                    <td>
                        {created_at && <p>Создана: <br></br>{created_at}</p>}
                        {formed_at && <p>Сформирована:<br></br>{formed_at}</p>}
                        {requestFinishedDate!="" && <p>Завершена:<br></br>{requestFinishedDate}</p>}
                        {finished_at && <p>Завершена:<br></br>{finished_at}</p>}
                    </td>
                    {/* <td>{created_at}</td>
                    <td>{formed_at}</td>
                    <td>{requestFinishedDate!="" ? requestFinishedDate :finished_at}</td> */}
                    <td>{(status=="IN_WORK") && requestStatus=="" && <Button onClick={(e) => {finish_request(id)}}>Завершить</Button>}</td>
                    <td>{(status=="IN_WORK") && requestStatus=="" && <Button onClick={(e) => {cancel_request(id)}}>Отменить</Button>}</td>
            </tr>
        ); 
    } else {
        return ( 
            <tr className={`${loading && 'containerLoading'}`} >
                        {/* {specialist.map((item, index)=> (
                            <Col key={index}>
                                    {status=="CREATED" ? <SpecialistCardInRequestWithButton {...item} />:  <SpecialistCardInRequest {...item} />}
                            </Col>
                        ))} */}
                    <td>{id.toString()}</td>
                    <td>{creator}</td>
                    <td>{comment}</td>
                    <td>{requestStatus!="" ? requestStatus : status}</td>
                    <td>
                        {specialist.map(({id, name}) => {
                            return (
                                <p key={Number(id)}>{name}</p>
                            );
                        })}
                    </td>
                    <td>
                        {created_at && <p>Создана: <br></br>{created_at}</p>}
                        {formed_at && <p>Сформирована:<br></br>{formed_at}</p>}
                        {requestFinishedDate!="" && <p>Завершена:<br></br>{requestFinishedDate}</p>}
                        {finished_at && <p>Завершена:<br></br>{finished_at}</p>}
                    </td>
            </tr>
        ); 
    }
}  


export default ServiceRequestTableRow;