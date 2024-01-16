import {FC, useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {logout} from './modules/authorization'
import { useDispatch } from 'react-redux'
import { setAuth, setLogout } from './specialists_store/authSlice';
import type { RootState } from './specialists_store/specialists_store'
import { useSelector } from 'react-redux'
import './SpecialistPage.css'
import './AdditionalStyle.css'

const LogoutPage: FC = () => {

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const authStatus = useSelector((state: RootState) => state.authStatus.value)

    const logout_user = async () =>{
        await setLoading(true)
        await logout()
        sessionStorage.clear()
        localStorage.clear()
        dispatch(setLogout())
        await setLoading(false)
    }

    useEffect(() => {
        // logout_user()
        // Этот код выполнится на mount`е компонента
              
        return () => {
          // Этот код выполнится на unmount`е компонента
        }
      
        // Это список зависимостей хука, он будет вызван каждый раз, когда зависимости будут меняться
      }, [])


    if (authStatus) {
        return (
            <div className={`container text-center ${loading && 'containerLoading'}`}>
            <Breadcrumb>
                <Breadcrumb.Item href="/" active>Выход</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Нажмите на кнопку для выхода из учетной записи</h1>
                <Button onClick={logout_user} className="Button">Выход</Button>
            </div>
        )
    } else {
        return (
            <div className={`container text-center ${loading && 'containerLoading'}`}>
            <Breadcrumb>
                <Breadcrumb.Item href="/" active>Выход</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Вы вышли с сайта</h1>
            </div>
        )
    } 
}

export default LogoutPage