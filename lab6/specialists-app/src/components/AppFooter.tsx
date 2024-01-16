import { Component } from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import '../AdditionalStyle.css'

var style1 = {
    // backgroundColor: "white",
    // borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    // padding: "20px",
    // position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '400px',
  width: '100%',
}


class AppFooter extends Component{
    render() {
        return(
            <div>
            <hr></hr>
            {/* <div style={phantom} /> */}
            {/* <div style={style1}> */}
            <div>@2023 Заявки на услуги специалистов ГУИМЦ</div>  
                </div>
            // </div>
            // <div className="fixed-bottom">
            //     <div>@2023 Заявки на услуги специалистов ГУИМЦ</div>  
            //     {/* <Navbar color="dark">
            //         <Container>
            //             <NavbarBrand>@2023 Заявки на услуги специалистов ГУИМЦ</NavbarBrand>
            //         </Container>
            //     </Navbar> */}
            // </div>
        )
    }
}

export default AppFooter