import { FC, useState, useEffect} from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { ISpecialist, getSpecialists, getFilteredSpecialists } from './modules/get-specialist'
import InputField from './components/inputField'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SmallSpecialistCard from './components/SmallSpecialistCard'

const SpecialistsPage: FC = () => {

  
    const [searchValue, setSearchValue] = useState('')

    const [loading, setLoading] = useState(false)

    const [specialistsList, setSpecialists] = useState<ISpecialist[]>([])
    
    const loadSpecialists = async () =>{
        await setLoading(true)
        const { specialists } = await getSpecialists()
        console.log(specialists)
        await setLoading(false)
        await setSpecialists(specialists)
    }


    const handleSearch = async () =>{
        await setLoading(true)
        const { specialists } = await getFilteredSpecialists(searchValue)
        await setLoading(false)
        await setSpecialists(specialists)
    }

    useEffect(() => {
        loadSpecialists()
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

            <InputField
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
                        <a href={`/specialists/${item.id}`} style={{textDecoration: 'none'}}>
                            <SmallSpecialistCard {...item} />
                        </a>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default SpecialistsPage