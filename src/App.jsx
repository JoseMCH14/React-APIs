import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MiApi } from './components/MiApi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./assets/img/Logo.png"

function App() {
  

  return (
    <>
    <Container className='d-flex flex-column justify-content-center align-items-center vw-100'>
        <header className=' d-flex justify-content-center mb-3 bg-dark-subtle vw-100'>
          <Navbar >
              <Navbar.Brand className='d-flex justify-content-center me-5'>
                <img
                  alt=""
                  src={logo}
                  width="120"
                  height="100"
                  className="d-inline-block align-center"
                />
              </Navbar.Brand>
              <Nav className='ms-5 pt-5'>
                <Nav.Link className='ms-5 link-light' href="#">Incio</Nav.Link>
                <Nav.Link className='link-light' href="#">Sub-secretarias</Nav.Link>
                <Nav.Link className='link-light' href="#">Gobierno</Nav.Link>
                <Nav.Link className='link-light' href="#">Nosotros</Nav.Link>
              </Nav>
          </Navbar>  
        </header> 
        <main>
          <MiApi />
        </main>
        <footer className='bg-primary'>
          <Container>
            <Row>
              <Col >
              </Col>
            </Row>
          </Container>
        </footer>
    </Container>
    </>
  )
}

export default App
