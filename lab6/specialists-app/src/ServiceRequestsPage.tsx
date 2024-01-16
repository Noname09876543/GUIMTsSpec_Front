import { FC, useState, useEffect} from 'react'
import { Spinner } from 'react-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { IServiceRequest, getFilteredServiceRequests } from './modules/get-service_requests';
import ServiceRequestCard from './components/ServiceRequestCard';
import ServiceRequestFilter from './components/ServiceRequestFilter'
import './AdditionalStyle.css'

const ServiceRequestsPage: FC = () => {

    const [loading, setLoading] = useState(false)

    const [status, setStatus] = useState(localStorage.getItem("status_filter") || "ALL")

    const [formed_at_from, setFormedAt] = useState(localStorage.getItem("formed_at_from") || "")

    const [formed_at_to, setFormedTo] = useState(localStorage.getItem("formed_at_to") || "")


    const [serviceRequestsList, setServiceRequests] = useState<IServiceRequest[]>([])


    const loadServiceRequests = async () =>{
        await setLoading(true)
        const { service_requests } = await getFilteredServiceRequests(status, formed_at_from, formed_at_to)
        // console.log(service_requests)
        await setServiceRequests(service_requests)
        await setLoading(false)
    }

    const handleSearch = async () =>{
        // console.log(status)
        // console.log(formed_at_from)
        // console.log(formed_at_to)
        localStorage.setItem('status_filter', status)
        localStorage.setItem('formed_at_from', formed_at_from)
        localStorage.setItem('formed_at_to', formed_at_to)
        await setLoading(true)
        // console.log(searchValue)
        const { service_requests } = await getFilteredServiceRequests(status, formed_at_from, formed_at_to)
        await setLoading(false)
        await setServiceRequests(service_requests)
    }

    useEffect(() => {
        handleSearch()
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
                <Breadcrumb.Item href="/specialists/" active>Мои заявки</Breadcrumb.Item>
            </Breadcrumb>

            <ServiceRequestFilter
                status={status}
                setStatusValue={(status) => setStatus(status)}
                formed_at_from={formed_at_from}
                setFormedAtValue={(formed_at_from) => setFormedAt(formed_at_from)}
                formed_at_to={formed_at_to}
                setFormedAtTo={(formed_at_to) => setFormedTo(formed_at_to)}
                loading={loading}
                onSubmit={handleSearch}
            />

            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}

            {serviceRequestsList.map((item, index)=> (
                <div key={index}>
                    <ServiceRequestCard {...item} />
                </div>
            ))}
            
            {/* <table>
            <td>id</td>
            <td>Создатель</td>
            <td>Комментарий</td>
            <td>Статус</td>
            <td>Создана</td>
            <td>Сформирована</td>
            <td>Завершена</td>
            {serviceRequestsList.map((item, index)=> (
                <ServiceRequestTableRow {...item} />
            ))}
            </table> */}
        </div>
    )
}

export default ServiceRequestsPage