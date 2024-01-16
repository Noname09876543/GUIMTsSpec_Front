import { ChangeEvent, FC, SetStateAction, useEffect, useState} from 'react'
import { Breadcrumb, Button, Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getSpecialist, change_spec, add_new_spec } from './modules/get-specialist';
import InputField from './components/InputField';
import TextArea from './components/TextArea';
import './AdditionalStyle.css'

const redirect_to_spec = (id = 0) => {
    window.location.href = `/specialists_table/${id}`
 }


const SpecialistDetailPage: FC = () => {

    const {specialistId, setSpecialistId } = useParams();

    const [loading, setLoading] = useState(false)
    
    const [specialistName, setSpecialistName] = useState('');
    
    const [specialistDescription, setSpecialistDescription] = useState('');

    const [specialistImg, setSpecialistImage] = useState('');

    const [file, setFile] = useState<File>();

    const [invalidMessage, setInvalidMessage] = useState("")

    const [successMessage, setSuccessMessage] = useState("")


    const loadSpecialist = async () =>{
        await setLoading(true)
        if (!isNaN(Number(specialistId))){
            const { name, desc, preview_image } = await getSpecialist(Number(specialistId))
            setSpecialistName(name)
            setSpecialistDescription(desc)
            setSpecialistImage(preview_image)
        }
        await setLoading(false)
    }

    const saveSpecialist = async () => {
        await setLoading(true)
        try{
            if (!isNaN(Number(specialistId))){
                await change_spec(Number(specialistId), specialistName, specialistDescription, file)
                setSuccessMessage("Данные успешно обновлены")
            } else {
                let { id } = await add_new_spec(specialistName, specialistDescription, file)
                redirect_to_spec(id = Number(id))
            }
        } catch {
            setInvalidMessage("Ошибка заполнения данных")
        }
        await setLoading(false)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
          setSpecialistImage(URL.createObjectURL(e.target.files[0]))
        }
      };

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
                <Breadcrumb.Item href="/specialists/">Таблица специалистов</Breadcrumb.Item>
                <Breadcrumb.Item active>{!isNaN(Number(specialistId)) ? specialistName : "Добавление специалиста"}</Breadcrumb.Item>
            </Breadcrumb>
            {invalidMessage!="" && <h2 className='erMessage'>{invalidMessage}</h2>}
            {successMessage!="" && <h2 className='successMessage'>{successMessage}</h2>}

            <Card className="card">
                
                <InputField
                        value={specialistName}
                        inputType='text'
                        setValue={(value) => setSpecialistName(value)}
                        placeholder='Имя'
                        fieldName='name'
                    />
                <TextArea
                        value={specialistDescription}
                        setValue={(value) => setSpecialistDescription(value)}
                        placeholder='Описание специалиста'
                        fieldName='desc'
                    />
                <div className='img_choose_block'>
                    <p>Текущее изображение: </p>
                    <img src={specialistImg}/>
                    <br></br>
                    <input type='file' name='preview_image' onChange={handleFileChange}/>
                </div>

                <Button onClick={(e) => {saveSpecialist()}}>Сохранить</Button>
            </Card>
        </div>
    )
}

export default SpecialistDetailPage