import { FC, useState} from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Button } from 'react-bootstrap'
import InputField from './components/InputField';
import CheckBoxField from './components/CheckBoxField';

import {registration} from './modules/registration'


const RegistrationPage: FC = () => {
   
    const [usernameValue, setUsernameValue] = useState('')

    const [fullNameValue, setFullNameValue] = useState('')

    const [emailValue, setEmailValue] = useState('')

    const [phoneValue, setPhoneValue] = useState('')

    const [passwordValue, setPasswordValue] = useState('')

    const [isStaffValue, setIsStaffValue] = useState(false)


    const authorization = async () =>{
        // console.log("registration")
        // console.log(loginValue)
        // console.log(passwordValue)
        await registration(usernameValue, fullNameValue, emailValue, phoneValue, passwordValue, String(isStaffValue))
        // await registration("user3", "Иванов Иван Иванович", "user3@example.com", "89008007000", "admin", "True")
        // console.log("test" + test)
    }

    return (
        
        <div className={`container`}>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
                <Breadcrumb.Item href="/authorization/" active>Регистрация</Breadcrumb.Item>
            </Breadcrumb>

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
}

export default RegistrationPage