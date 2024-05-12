import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MiApi } from './components/MiApi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./assets/img/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInstagram,faTiktok,faXTwitter} from  '@fortawesome/free-brands-svg-icons'

function App() {
  

  return (
    <>
    <Container className='d-flex flex-column justify-content-center align-items-center vw-100'>
        <header className=' d-flex justify-content-center mb-3 bg-dark-subtle vw-100'>
          <Container>
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
              <Nav className='pt-5'>
                <Nav.Link className='link-light' href="#">Incio</Nav.Link>
                <Nav.Link className='link-light' href="#">Sub-secretarias</Nav.Link>
                <Nav.Link className='link-light' href="#">Gobierno</Nav.Link>
                <Nav.Link className='link-light' href="#">Nosotros</Nav.Link>
              </Nav>
          </Navbar> 
          </Container> 
        </header> 
        <main>
          <Container>
            <MiApi />
          </Container>
        </main>
        <footer className='bg-dark-subtle vw-100'>
        <Container>
          <Row>
            <Col>
                <ul className='d-flex flex-row mt-4'>
                  <li><a href='https://www.instagram.com/ministeriosalud/?hl=es'><FontAwesomeIcon icon={faInstagram} size="xl" style={{color: "#ffffff",}} /></a></li>
                  <li><a href='https://www.tiktok.com/@ministeriosalud'><FontAwesomeIcon className = "mx-3" icon={faTiktok} size="xl" style={{color: "#ffffff",}} /></a></li>
                  <li><a href='https://twitter.com/ministeriosalud?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'><FontAwesomeIcon icon={faXTwitter} size="xl" style={{color: "#ffffff",}} /></a></li>
                </ul>
            </Col>
            <div className="col-lg-4 ">
              <h3 className='text-light font-weight-bold'>Derechos de autor</h3>
              <p className='text-light font-weight-bold' >(c) 2024 Mi Sitio Web. Todos los derechos reservados.</p>
            </div>
          </Row>
        </Container>
        </footer>
    </Container>
    </>
  )
}

export default App
