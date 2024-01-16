import { FC} from 'react'
import { Button } from 'react-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {logout} from './modules/authorization'

const LogoutPage: FC = () => {

    const logout_user = async () =>{
        await logout()
    }

    return (
        <div className='container text-center'>
        <Breadcrumb>
            <Breadcrumb.Item href="/" active>Выход</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Нажмите на кнопку для выхода из учетной записи</h1>
        <a href="/specialists">
            <Button onClick={logout_user} className="Button">Выход</Button>
        </a>
        </div>
    )
}

export default LogoutPage