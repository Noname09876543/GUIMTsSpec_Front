import { FC, useState, useEffect} from 'react'
import { Spinner } from 'react-bootstrap'
import { getSpecialist } from './modules/get-specialist'
import SpecialistCard from './components/SpecialistCard'
import './SpecialistPage.css'
import { useParams } from 'react-router';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const SpecialistPage: FC = () => {
  
    const { specialistId } = useParams();

    const [loading, setLoading] = useState(false)

    const [specialistName, setSpecialistName] = useState('');
    
    const [specialistDescription, setSpecialistDescription] = useState('');

    const [specialistImg, setSpecialistImage] = useState('');

    const loadSpecialist = async () =>{
        await setLoading(true)
        const { name, desc, preview_image } = await getSpecialist(Number(specialistId))
        console.log(name)
        console.log(specialistId)
        await setLoading(false)
        await setSpecialistName(name)
        await setSpecialistDescription(desc)
        await setSpecialistImage(preview_image)
    }

    useEffect(() => {
        loadSpecialist()
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
                <Breadcrumb.Item href="/specialists/">Специалисты</Breadcrumb.Item>
                <Breadcrumb.Item active>{specialistName}</Breadcrumb.Item>
            </Breadcrumb>
            <SpecialistCard
                name={specialistName}
                desc={specialistDescription}
                preview_image={specialistImg}
            />
        </div>
    )
}

export default SpecialistPage