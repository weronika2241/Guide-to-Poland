import {useContext} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel'; 
import {LanguageContext} from '../App'

export default function Menu()
{
    const {data, setLanguage} = useContext(LanguageContext)

    return(
        <>
            <header>
                <Navbar bg="dark" fixed='top' variant="dark" className='navbarScroll' expand="sm">
                <Container>
                    <Nav.Link className='btn_lang p-2 My_A' onClick={() => setLanguage(require ("../en.json"))}>EN</Nav.Link>
                    <Nav.Link className='btn_lang p-2 My_A' onClick={() => setLanguage(require ("../pl.json"))}>PL</Nav.Link>
                    <Navbar.Brand href="#guide" >Guide to Poland</Navbar.Brand>
                    <Navbar.Toggle type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" >{data["home"]}</Nav.Link>
                        <Nav.Link href="#gallery">{data["gallery"]}</Nav.Link>
                        <Nav.Link href="#tickets">{data["ticket"]}</Nav.Link>
                        <Nav.Link href="#contacts">{data["contact"]}</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </header>
            <main>
            <Carousel id="home">
                <Carousel.Item>
                <img
                    className="d-block w-100 filtrZdj"
                    src="zdj3.jpg"
                />
                <Carousel.Caption>
                    <h2>{data["Cracow"]}</h2>
                    <p>{data["Cracow_inf"]}</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100 filtrZdj"
                    src="zdj4.jpg"
                />
                <Carousel.Caption>
                    <h2>{data["Warsaw"]}</h2>
                    <p>{data["Warsaw_inf"]}</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100 filtrZdj"
                    src="gdansk.jpg"
                />
                <Carousel.Caption>
                    <h2>{data["Gdansk"]}</h2>
                    <p>{data["Gdansk_inf"]}</p>
                </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
          </main>
        </>
    );
}