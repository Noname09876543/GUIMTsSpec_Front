import { FC} from 'react'
import { Button } from 'react-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const MainPage: FC = () => {
    return (
        <div className='container text-center'>
        <Breadcrumb>
            <Breadcrumb.Item href="/" active>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Добро пожаловать!</h1>
        <h2>Вы попали на сайт "Заявки на услуги специалистов ГУИМЦ"</h2>
        <p>Нажав на кнопку, перейдите для выбора специалиста</p>
            <a href="/specialists">
                <Button className="Button">Выбрать специалиста</Button>
            </a>
        </div>
    )
}

export default MainPage