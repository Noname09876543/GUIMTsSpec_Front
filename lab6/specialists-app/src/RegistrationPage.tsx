import { FC, useState} from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Button } from 'react-bootstrap'
import InputField from './components/InputField';
import CheckBoxField from './components/CheckBoxField';
import {registration} from './modules/registration'
import './AdditionalStyle.css'
import './SpecialistPage.css'
import './AdditionalStyle.css'

const RegistrationPage: FC = () => {
    const [regStatus, setRegStatus] = useState('')

    const [loading, setLoading] = useState(false)
   
    const [usernameValue, setUsernameValue] = useState('')

    const [fullNameValue, setFullNameValue] = useState('')

    const [emailValue, setEmailValue] = useState('')

    const [phoneValue, setPhoneValue] = useState('')

    const [passwordValue, setPasswordValue] = useState('')

    const [isStaffValue, setIsStaffValue] = useState(false)


    const authorization = async () =>{
        await setLoading(true)
        const reg = await registration(usernameValue, fullNameValue, emailValue, phoneValue, passwordValue, String(isStaffValue))
        console.log(reg.status)
        setRegStatus(reg.status)
        // await registration("user3", "Иванов Иван Иванович", "user3@example.com", "89008007000", "admin", "True")
        await setLoading(false)
    }

    if (regStatus != "Success"){
        return (
            <div className={`container ${loading && 'containerLoading'}`}>

                <Breadcrumb>
                    <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
                    <Breadcrumb.Item href="/authorization/" active>Регистрация</Breadcrumb.Item>
                </Breadcrumb>

                {regStatus=="Error" && <h2  className='erMessage'>Было некорректно заполнено одно из полей, попробуйте снова!</h2>}

                <InputField
                    value={usernameValue}
                    inputType='text'
                    setValue={(value) => setUsernameValue(value)}
                    placeholder='Логин'
                />
    
                <InputField
                    value={fullNameValue}
                    inputType='text'
                    setValue={(value) => setFullNameValue(value)}
                    placeholder='ФИО'
                />
    
                <InputField
                    value={emailValue}
                    inputType='email'
                    setValue={(value) => setEmailValue(value)}
                    placeholder='email'
                />
    
                <InputField
                    value={phoneValue}
                    inputType='text'
                    setValue={(value) => setPhoneValue(value)}
                    placeholder='Телефон'
                />
    
                <InputField
                    value={passwordValue}
                    inputType='password'
                    setValue={(value) => setPasswordValue(value)}
                    placeholder='Пароль'
                />
    
                <CheckBoxField
                    value={isStaffValue}
                    setValue={(value) => setIsStaffValue(value)}
                    fieldLabel='Запросить права модератора'
                />
    
                <Button onClick={authorization}>Регистрация</Button>
            </div>
        )
    } else {
        return (
            <div className={`container text-center ${loading && 'containerLoading'}`}>
                <h1>Вы успешно зарегистрировались на сайте</h1>
            </div>
        )
    } 
}

export default RegistrationPage