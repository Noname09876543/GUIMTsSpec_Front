import { FC, useState, useEffect} from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { ISpecialist, getFilteredSpecialists } from './modules/get-specialist'
import SearchField from './components/SearchField'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SmallSpecialistCard from './components/SmallSpecialistCard'
import { useSelector } from 'react-redux'
import { RootState } from './specialists_store/specialists_store';
import './SpecialistPage.css'


const SpecialistsPage: FC = () => {

  
    const [searchValue, setSearchValue] = useState(localStorage.getItem("search_value") || "")

    const [loading, setLoading] = useState(false)

    const [specialistsList, setSpecialists] = useState<ISpecialist[]>([])
    
    const specialists_in_request = useSelector((state: RootState) => state.specialists.specialists)

    // useEffect(() => {
    //     dispatch(getServiceRequest());
    //   }, []);
  
    // console.log(specialists_in_request)


    const loadSpecialists = async () =>{
        await setLoading(true)
        const { specialists, service_request_id } = await getFilteredSpecialists(searchValue)
        if (service_request_id != null) {
            localStorage.setItem("service_request_id", service_request_id.toString())
        }
        await setLoading(false)
        await setSpecialists(specialists)
    }


    const handleSearch = async () =>{
        await setLoading(true)
        localStorage.setItem('search_value', searchValue)
        const { specialists } = await getFilteredSpecialists(searchValue)
        await setSpecialists(specialists)
        await setLoading(false)
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
                <Breadcrumb.Item href="/specialists/" active>Специалисты</Breadcrumb.Item>
            </Breadcrumb>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}

            <SearchField
                value={searchValue}
                setValue={(value) => setSearchValue(value)}
                loading={loading}
                onSubmit={handleSearch}
            />

            {!specialistsList.length && <div>
                <h1>К сожалению, пока ничего не найдено :(</h1>
            </div>}

            <Row xs={4} md={4} className="g-4">
                {specialistsList.map((item, index)=> (
                    <Col key={index}>
                        {/* <a href={`/specialists/${item.id}`} style={{textDecoration: 'none'}}> */}
                            <SmallSpecialistCard {...item} />
                        {/* </a> */}
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default SpecialistsPage