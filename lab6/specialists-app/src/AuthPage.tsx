import { FC, useState} from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Button, Spinner } from 'react-bootstrap'
import InputField from './components/InputField';
import {authentification} from './modules/authorization'
import { setAuth } from './specialists_store/authSlice';
import type { AppDispatch, RootState } from './specialists_store/specialists_store'
import { useSelector } from 'react-redux'
import { getSpecialists } from './modules/get-specialist';
import { get_service_request } from './modules/get-service_requests';
import { setNum } from './specialists_store/specialistsSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './AdditionalStyle.css'
import './SpecialistPage.css'

const AuthPage: FC = () => {

    const [loading, setLoading] = useState(false)

    const [loginValue, setLoginValue] = useState('')

    const [passwordValue, setPasswordValue] = useState('')


    const authStatus = useSelector((state: RootState) => state.authStatus.value)

    const dispatch = useDispatch<AppDispatch>();

    const [invalidMessage, setInvalidMessage] = useState("")

    const authorization = async () =>{
        await setLoading(true)
        const auth = await authentification(loginValue, passwordValue)
        if (auth['status'] == "ok"){
            localStorage.setItem('username', loginValue)
            localStorage.setItem('role', auth.role)
            const specialistsResult = await getSpecialists()
            await dispatch(setAuth())
            if (specialistsResult.service_request_id != null){
                const serviceRequestSpecialists = await get_service_request(Number(specialistsResult.service_request_id))
                dispatch(setNum(serviceRequestSpecialists.specialist.length))
            } else {
                console.log("specialistsResult2")
            }
        } else {
            setInvalidMessage("Неверный логин или пароль!")
        }
        await setLoading(false)
    }

    if (!authStatus) {
        return (
            <div className={`container ${loading && 'containerLoading'}`}>
                {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
                    <Breadcrumb.Item href="/authorization/" active>Авторизация</Breadcrumb.Item>
                </Breadcrumb>

                {invalidMessage!="" && <h2 className='erMessage'>{invalidMessage}</h2>}

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
            </div>
        )
    } else {
        return (
            <div className={`container text-center  ${loading && 'containerLoading'}`}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
                    <Breadcrumb.Item href="/authorization/" active>Авторизация</Breadcrumb.Item>
                </Breadcrumb>
            <h1>Вы авторизованы на сайте как {localStorage.getItem('username')}</h1>
            </div>
        )
    } 

}

export default AuthPage