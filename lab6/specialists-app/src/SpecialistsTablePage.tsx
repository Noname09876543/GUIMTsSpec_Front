import { FC, useState, useEffect} from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { ISpecialist, getFilteredSpecialists, getSpecialist } from './modules/get-specialist'
import SpecialistCard from './components/SpecialistCard'
import { useParams } from 'react-router';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SpecialistRow from './components/SpecialistRow'
import SearchField from './components/SearchField'
import './SpecialistPage.css'
import './AdditionalStyle.css'

const redirect_to_add = () => {
    window.location.href = 'add_spec/'
 }


const SpecialistsTablePage: FC = () => {
  
    const [searchValue, setSearchValue] = useState(localStorage.getItem("search_value") || "")

    const [loading, setLoading] = useState(false)

    const [specialistsList, setSpecialists] = useState<ISpecialist[]>([])


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

    useEffect(() => {
        // loadSpecialist()
        // Этот код выполнится на mount`е компонента
              
        return () => {
          // Этот код выполнится на unmount`е компонента
        }
      
        // Это список зависимостей хука, он будет вызван каждый раз, когда зависимости будут меняться
      }, [])

    return (
        <div className={`container ${loading && 'containerLoading'}`}>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            <Breadcrumb>
                <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
                <Breadcrumb.Item href="/service_requests_table/" active>Специалисты таблицей</Breadcrumb.Item>
            </Breadcrumb>

            <SearchField
                value={searchValue}
                setValue={(value) => setSearchValue(value)}
                loading={loading}
                onSubmit={handleSearch}
            />

            <table>
            <thead>
                <tr>
                    <td>id</td>
                    <td>Имя</td>
                    <td>Описание</td>
                    <td>Изображение</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {specialistsList.map((item, index)=> (
                    <SpecialistRow key={index} {...item} />
                ))}
            </tbody>
            </table>
            <Button onClick={(e) => {redirect_to_add()}}>Добавить специалиста</Button>
        </div>
    )
}

export default SpecialistsTablePage