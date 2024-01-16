import { FC, useState} from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Button } from 'react-bootstrap'
import InputField from './components/InputField';
import {authentification} from './modules/authorization'



const AuthPage: FC = () => {

    const [loginValue, setLoginValue] = useState('')

    const [passwordValue, setPasswordValue] = useState('')


    const authorization = async () =>{
        // console.log("authorization")
        // console.log(loginValue)
        // console.log(passwordValue)
        const test = await authentification(loginValue, passwordValue)
    }

    return (
        
        <div className={`container`}>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
                <Breadcrumb.Item href="/authorization/" active>Авторизация</Breadcrumb.Item>
            </Breadcrumb>


            <InputField
                value={loginValue}
                inputType='text'
                setValue={(value) => setLoginValue(value)}
                placeholder='Логин'
            />

            <InputField
                value={passwordValue}
                inputType='password'
                setValue={(value) => setPasswordValue(value)}
                placeholder='Пароль'
            />
        
            <Button onClick={authorization}>Авторизация</Button>

            {/* <Button>Регистрация</Button> */}

        </div>
    )
}

export default AuthPage