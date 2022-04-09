import React from "react";
import gambarlogonavbar from '../component/image/laundrylogonavbar.png';
// import {Container} from "react-bootstrap";
// import {Offcanvas} from "react-bootstrap";
// import {Nav} from "react-bootstrap";
// import {NavDropdown} from "react-bootstrap";
// import {Form} from "react-bootstrap";
// import {FormControl} from "react-bootstrap";
// import {Button} from "react-bootstrap";
// import { Link } from "react-router-dom";

export default class Navbar_owner extends React.Component{
    Logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        localStorage.removeItem("kasir")
        localStorage.removeItem("owner")
        window.location="/login"
    }
  render(){
    return (
    <container>
      <nav class="navbar navbar-expand-lg navbar-dark bg-light">
        <div class="container-lg">
            {/* Navbar brand */}
            <div class="navbar-brand text-dark" href="/home_owner">
            <img src={gambarlogonavbar} className="App-logoo"></img> &nbsp;
                THIS IS LAUNDRY
            </div>
            {/* tombol dropdown responsive */}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            {/* navbar items */}
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/home_owner">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/member.owner">MEMBER</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/user.owner">USER</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/paket.owner">PAKET</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/outlet.owner">OUTLET</a>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link text-dark" href="/transaksi.owner">TRANSAKSI</a>
                    </li> */}
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="/laporanOwner">LAPORAN</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" onClick={()=> this.Logout()}>LOGOUT</a>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
    </container>
//     <Navbar bg="light" expand={false}>
//   <Container fluid>
//     <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
//     <Navbar.Toggle aria-controls="offcanvasNavbar" />
//     <Navbar.Offcanvas
//       id="offcanvasNavbar"
//       aria-labelledby="offcanvasNavbarLabel"
//       placement="end"
//     >
//       <Offcanvas.Header closeButton>
//         <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
//       </Offcanvas.Header>
//       <Offcanvas.Body>
//         <Nav className="justify-content-end flex-grow-1 pe-3">
//           <Nav.Link href="#action1">Home</Nav.Link>
//           <Nav.Link href="#action2">Link</Nav.Link>
//           <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
//             <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//             <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item href="#action5">
//               Something else here
//             </NavDropdown.Item>
//           </NavDropdown>
//         </Nav>
//         <Form className="d-flex">
//           <FormControl
//             type="search"
//             placeholder="Search"
//             className="me-2"
//             aria-label="Search"
//           />
//           <Button variant="outline-success">Search</Button>
//         </Form>
//       </Offcanvas.Body>
//     </Navbar.Offcanvas>
//   </Container>
// </Navbar>
    )
  }
}

