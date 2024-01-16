import { Button, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import type { AppDispatch, RootState } from './specialists_store/specialists_store';
import { useSelector } from 'react-redux'
import { getServiceRequest } from './specialists_store/specialistsSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './AdditionalStyle.css'


function NavigationBar() {
  const userName = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const authStatus = useSelector((state: RootState) => state.authStatus.value)
  const specialistsNum = useSelector((state: RootState) => state.specialists.value)

  const dispatch = useDispatch<AppDispatch>();

  const service_request_id = useSelector((state: RootState) => state.specialists.service_request_id)

  useEffect(() => {
    dispatch(getServiceRequest());
  }, []);

  const redirect_to_service_requests = () => {
    window.location.href = `/service_requests/`
 }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Заявки на услуги специалистов ГУИМЦ</Navbar.Brand>
        <div>        
        {
          authStatus 
          ? (specialistsNum == 0 
            ? <Button className='ineactive_button request_spec_button'>Новая заявка (специалисты не выбраны)</Button>
            : <Button onClick={(e) => {redirect_to_service_requests();}}>Новая заявка<span> (cпециалистов в черновике: {specialistsNum})</span></Button>
            )
          : ""
        }
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            <Nav.Link href="/specialists/">Специалисты</Nav.Link>
            {/* {userName &&<Nav.Link href="/service_requests/">Мои Заявки</Nav.Link>} */}
            {/* {authStatus &&<Nav.Link href="/service_requests/">{specialistsNum == 0 ?  <span>Заявки</span> : <i><b><span>Заявки (Специалистов в черновике: {specialistsNum})</span></b></i>}</Nav.Link>} */}
            {authStatus &&<Nav.Link href="/service_requests/"><span>Заявки</span></Nav.Link>}
            {authStatus && role=="moderator" && <Nav.Link href="/specialists_table/">Таблица специалистов</Nav.Link>}
            {authStatus &&<Nav.Link href="/service_requests_table/">Заявки таблицей</Nav.Link>}
            {authStatus && role=="moderator" && <Nav.Link href="/moderator_requests/">Запросы на права модератора</Nav.Link>}
            {!authStatus && <Nav.Link href="/authorization/">Авторизация</Nav.Link>}
            {!authStatus && <Nav.Link href="/registration/">Регистрация</Nav.Link>}
            {authStatus && <Nav.Link href="/logout/">Выход</Nav.Link>}
            <NavItem>{userName ? <span>{userName}</span>: <span></span>}</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;