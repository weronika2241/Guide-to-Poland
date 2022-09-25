import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


  // Obsługa walidacji formularzy 
  function App() {

    const[data, setLanguage] = useState(require ("./en.json"));

    const { register, formState: { errors }, handleSubmit} = useForm({
      mode: 'all', // 'onChange' && 'onBlur'
    });

    const {register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2} = useForm({
      mode: 'all', // 'onChange' && 'onBlur'
    });
    const onSubmit = data => send_TicketData(data);
    const handleonSubmit = data_contacts => sendContacts(data_contacts);
    
 
  // Formularz Tickets, pobieranie list miejsc z bazy danych
    const [places, setPlaces] = useState([]);
    const [city, setCity] = useState([]);

    function Get_places(event) {
      setCity(event.target.value)
      setPrice(0)
      setPriceNormal(0)
      setPriceReduced(0)
      fetch("/api/get_places/" + event.target.value)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setPlaces(result);
            },
        )
      const $select = document.querySelector('#location');
      $select.value = '0';
      const $price1 = document.querySelector('#Price_1');
      $price1.value = '';
      const $price2 = document.querySelector('#Price_2');
      $price2.value = '';
    }

    // Hooki do pobierania danych z formularza Tickets

    
    const [date, setDate] = useState('');
    const [place, setPlace] = useState('');


    // Zabezpieczone ładowanie strony

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {                          // po załadowaniu strony pobiera miasta
        fetch("/api/get_citys")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              console.log(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
         )
    }, [])

    // Obliczanie ceny biletów
    const [price, setPrice] = useState(0);
    const [numberNormal, setNumberNormal] = useState(0);
    const [numberReduced, setNumberReduced] = useState(0);

    function send_TicketData(data) {
      fetch("/api/getTicketData", {                  //wysyłanie do backendu zapytanie  
        method: "POST",                                      // wysyłamy dane
        headers: {
          "Content-Type": "application/json" },
        body: JSON.stringify({
          "firstname": data.firstName,                     // zmienna / to co wpisał uzytkownik
          "lastname": data.lastName,
          "phone": data.phone,
          "date": date,
          "email": data.email,
          "city": city,
          "price": price,
          "ticker_normal": numberNormal,
          "ticker_reduced": numberReduced,
          "location": place
        })
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        ) }

    function sendContacts(data_contacts){
      fetch("/api/getContactsData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "firstnameContacts": data_contacts.firstName_contacts,
          "lastnameContacts": data_contacts.lastName_contacts,
          "phoneContacts": data_contacts.phone_contacts,
          "emailContacts": data_contacts.email_contacts,
          "textContacts": data_contacts.text_contacts
        })
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        ) }      



	function setPrice_1(event) {
    let number = event.target.value;
    if(number)
    {
		  setPrice(parseInt(event.target.value) * parseInt(priceNormal) + parseInt(numberReduced) * parseInt(priceReduced))
    }
    else
    {
      setPrice(parseInt(0) * parseInt(priceNormal) + parseInt(numberReduced) * parseInt(priceReduced))
    }
    
    if(!number && !numberReduced)
    {
      setPrice(0)
    }
		setNumberNormal(event.target.value)
    
	}

	function setPrice_2(event) {
    let number = event.target.value;
    if(number)
    {
		  setPrice(parseInt(event.target.value) * parseInt(priceReduced) + parseInt(numberNormal) * parseInt(priceNormal))
    }
    else
    {
      setPrice(parseInt(0) * parseInt(priceReduced) + parseInt(numberNormal) * parseInt(priceNormal))
    }

    if(!number && !numberNormal)
    {
      setPrice(0)
    }

		setNumberReduced(event.target.value)
    
	}
    const [priceNormal, setPriceNormal]= useState(0);
    function GetPriceNormal(place){
      setPrice(0)
      const $price1 = document.querySelector('#Price_1');
      $price1.value = '';
      const $price2 = document.querySelector('#Price_2');
      $price2.value = '';
      setNumberReduced(0)
      setNumberNormal(0)
      fetch("/api/get_PriceNormal/" + city + "/" + place)
        .then(res => res.json())
        .then(
        (result) => {
          setPriceNormal(result.price);
          console.log("Normal: " + result.price);
        },
        )
      setPlace(place)
    }

   

    const [priceReduced, setPriceReduced]= useState(0);
    function GetPriceReduced(place){
      setPrice(0)
      const $price1 = document.querySelector('#Price_1');
      $price1.value = '';
      const $price2 = document.querySelector('#Price_2');
      $price2.value = '';
      setNumberReduced(0)
      setNumberNormal(0)
      fetch("/api/get_PriceReduced/" + city + "/" + place)
        .then(res => res.json())
        .then(
        (result) => {
          setPriceReduced(result.price);
          console.log("Reduced: " + result.price);
        },
        )
      setPlace(place)
    }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
  return (
    <>
      <header>
        <Navbar bg="dark" fixed='top' variant="dark" className='navbarScroll' expand="sm">
          <Container>
            <Nav.Link className='btn_lang p-2 My_A' onClick={() => setLanguage(require ("./en.json"))}>EN</Nav.Link>
            <Nav.Link className='btn_lang p-2 My_A' onClick={() => setLanguage(require ("./pl.json"))}>PL</Nav.Link>
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


            <div className='container-xl' style={{background: "#F5F5F5"}}>
              <Row id="guide" className=' my-5 px-5 py-3 rounded border text-secondary' >
                <Col sm={4}>
                <Image src="map.jpg" title="Photo by Element5 Digital on Unsplash" thumbnail rounded />
                </Col>
                <Col sm={8}>
                  <h1 className='text-dark pt-4'>Guide to Poland</h1>
                  <p className='pt-4 fs-5 fw-bolder'>{data["description"]}</p>
                </Col>
              </Row>
            </div>

            <div id="gallery" className='mb-5 pb-4 container-fluid ' style={{background: "#F5F5F5"}}>
              <h2 className='pt-4 px-5 pb-4 fw-normal'>{data["gallery"]}</h2>
              <Row xs={1} sm={2} md={4} className="g-3 mx-5">       
                  <Col>
                  
                    <Card>
                      <Card.Img variant="top" className='height:80' title="Photo by freestocks on Unsplash" src="gdansk.jpg" />
                      <Card.Body>
                        <Card.Title>{data["Gdansk"]}</Card.Title>
                        <Card.Text>
                          {data["Gdansk_info"]}
                        </Card.Text>
                      </Card.Body>
                    </Card>

                    <Card className='mt-3'>
                      <Card.Img variant="top" title="Photo by David Mohseni on Unsplash" src="wroclaw1.jpg" />
                      <Card.Body>
                        <Card.Title>{data["Wroclaw"]}</Card.Title>
                        <Card.Text>
                          {data["Wroclaw_info"]}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" title="Photo by Severinus Dewantara on Unsplash" src="zdj3.jpg" />
                      <Card.Body>
                        <Card.Title>{data["Cracow"]}</Card.Title>
                        <Card.Text>
                          {data["Cracow_info"]}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className='mt-3'>
                      <Card.Img variant="top" src="malbork.jpg" title="Photo by MARCIN CZERNIAWSKI on Unsplash" />
                      <Card.Body>
                        <Card.Title>Malbork</Card.Title>
                        <Card.Text>
                          {data["Malbork_inf"]}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                  <Card>
                      <Card.Img variant="top" title="Photo by Iwona Castiello d'Antonio on Unsplash" src="zdj4.jpg" />
                      <Card.Body>
                        <Card.Title>{data["Warsaw"]}</Card.Title>
                        <Card.Text>
                          {data["Warsaw_info"]}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className='mt-3'>
                      <Card.Img variant="top" title="Photo by Andriyko Podilnyk on Unsplash" src="poznan.jpg" />
                      <Card.Body>
                        <Card.Title>{data["Poznan"]}</Card.Title>
                        <Card.Text>
                          {data["Poznan_inf"]}
                        </Card.Text>
                      </Card.Body>
                    </Card>  
                  </Col>
                  <Col>
                    <Card>
                      <Card.Img variant="top" title="Photo by Nomadic Julien on Unsplash" src="katowice.jpg" />
                      <Card.Body>
                        <Card.Title>Katowice</Card.Title>
                        <Card.Text>
                          {data["Katowice_inf"]}
                        </Card.Text>
                      </Card.Body>
                    </Card>  
                    <Card className='mt-3'>
                      <Card.Img variant="top" title="Photo by Alex Blokstra on Unsplash"  src="zakopane.jpg"/>
                      <Card.Body>
                        <Card.Title>Zakopane</Card.Title>
                        <Card.Text>
                          {data["Zakopane_inf"]}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
              </Row>
              
    

            </div>
            <div id="tickets" className='container-sm border thumbnail rounded mb-5' style={{background: "#F5F5F5"}}>
            <h2 className="px-5 mx-5 py-3 fw-normal">{data["ticket"]}</h2>
              <Form method="post" onSubmit={handleSubmit(onSubmit)}>
                <Row className='justify-content-sm-center'>
                  <Col lg='4'>

                    <Form.Control  className="my-3" placeholder={data["first_name"]} {...register("firstName",{ pattern: /^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/ , required:true})} />
                    {errors?.firstName?.type === "pattern" && (<p className='errors'>{data["Alphabetical characters only"]}</p>)}
                    {errors?.firstName?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}

                  </Col>
                  <Col lg='4'>
                    <Form.Control className="my-3" placeholder={data["last_name"]}  {...register("lastName",{ pattern:/^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/, required:true})}/>
                    {errors?.lastName?.type === "pattern" && (<p className='errors'>{data["Alphabetical characters only"]}</p>)}
                    {errors?.lastName?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}

                  </Col>
                </Row>
                <Row className='justify-content-sm-center'>
                  <Col lg='4'>

                    <Form.Control className="my-3" placeholder="E-mail" {...register("email",{ pattern:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, required:true})}/>
                    {errors?.email?.type === "pattern" && (<p className='errors'>{data["It's not a good e-mail"]}</p>)}
                    {errors?.email?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}

                  </Col>
                  <Col lg='4'>

                    <Form.Control className="my-3" maxLength={"9"} placeholder={data["phone"]} {...register("phone",{pattern: /^(0|[1-9]\d*)(\.\d+)?$/, minLength:9, required:true})}/>
                    {errors?.phone?.type === "pattern" && (<p className='errors'>{data["It's not a number"]}</p>)}
                    {errors?.phone?.type === "minLength" && (<p className='errors'>{data["Not enough digits"]}</p>)}
                    {errors?.phone?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}

                  </Col>
                </Row>
                <Row className='justify-content-sm-center'>
                  <Col lg='8'>

                  <Form.Select className="my-3 mb-4 form-select" aria-lbel="Default select example" onChange={Get_places}>
                   <option>{data["select city"]} </option>

                    {items.map(item => (
                        <option value={item.City}>{data[item.City]}</option>
                    ))}
                  </Form.Select>

                  <Form.Select id="location" className="my-3"  aria-label="Default select example" onChange={(event) => {GetPriceNormal(event.target.value); GetPriceReduced(event.target.value);}}>
                    <option value="0" > {data["select location"]} </option>
                    
                    {places.map(item => (
                        <option value={item.Place}>{data[item.Place]}</option>
                    ))}
                  </Form.Select>
                  
                  </Col>
                </Row>
                <Row className='justify-content-sm-center'>
                  <Col lg='3'>

                    <Form.Group controlId="dob">
                      <Form.Label>{data["select date"]}</Form.Label>
                      <Form.Control type="date" name="dob" placeholder="Date of visit" onChange={(event) => {setDate(event.target.value)}}/>
                    </Form.Group>

                    <Form.Control id="Price_1" type="number" onKeyDown={(e) =>["e", "E", "+", "-",",","."].includes(e.key) && e.preventDefault()} className="my-3" placeholder={data["Number of normal tickets"]} onChange={setPrice_1} />
                    <Form.Control id="Price_2" type="number" onKeyDown={(e) =>["e", "E", "+", "-",",","."].includes(e.key) && e.preventDefault()} className="my-3" placeholder={data["Number of reduced tickets"]} onChange={setPrice_2}/>

                    </Col>
                  <Col lg='2'>
                  </Col>
                  <Col lg='3'>
                    <h5 className='mt-5 pt-2'>{data["price"]} {price}zł</h5>
                    <Button size="lg" className='my-5' type="submit">{data["booking"]}</Button>
                  </Col>   
                </Row>
              </Form>
            </div>

            <div className=" container-fluid py-5 bg-dark" >
              <h2 className="fw-normal px-5 mx-3 text-light" >{data["contact"]}</h2>
              
              <Form id="contacts" onSubmit={handleSubmit2(handleonSubmit)}>
                <Row className='justify-content-sm-center'>
                  <Col sm={6} className="col-md-5">
                    <Form.Control className="my-2"  placeholder={data["first_name"]} {...register2("firstName_contacts",{ pattern: /^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/, required:true})}/>
                    {errors2?.firstName_contacts?.type === "pattern" && (<p className='errors'>{data["Alphabetical characters only"]}</p>)}
                    {errors2?.firstName_contacts?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}

                    <Form.Control className="my-2" placeholder={data["last_name"]} {...register2("lastName_contacts",{ pattern:/^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/, required:true})}/>
                    {errors2?.lastName_contacts?.type === "pattern" && (<p className='errors'>{data["Alphabetical characters only"]}</p>)}
                    {errors2?.lastName_contacts?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}

                    <Form.Control className="email my-2" placeholder="E-mail"  {...register2("email_contacts",{ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, required:true})}/>
                    {errors2?.email_contacts?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}
                    {errors2?.email_contacts?.type === "pattern" && (<p className='errors'>{data["It's not a good e-mail"]}</p>)}
                  </Col>
                  <Col sm={6} className="col-md-5 ">
                    <Form.Control className="my-2" type="number" onKeyDown={(e) =>["e", "E", "+", "-",",","."].includes(e.key) && e.preventDefault()} placeholder={data["phone"]}{...register2("phone_contacts",{pattern: /^(0|[1-9]\d*)(\.\d+)?$/, minLength:9, required:true})}/>
                    {errors2?.phone_contacts?.type === "pattern" && (<p className='errors'>{date["It's not a number"]}</p>)}
                    {errors2?.phone_contacts?.type === "minLength" && (<p className='errors'>{data["Not enough digits"]}</p>)}
                    {errors2?.phone_contacts?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}

                      <FloatingLabel controlId="floatingTextarea2" label={data["Text message"]} >
                        <Form.Control className="my-2" as="textarea" placeholder={data["Text message"]}  style={{ height: '90px' }} {...register2("text_contacts",{required:true})}/>
                        {errors2?.text_contacts?.type === "required" && (<p className='errors'>{data["Required field"]}</p>)}
                      </FloatingLabel>

                      
                  </Col>
                </Row>
                <div className='text-center'>
                  <Button variant="primary" size="lg" type="submit" className='my-3 mx-5 px-5'>{data["send"]}</Button>
                </div>
              </Form>
            </div>

      <footer fluid>
        <div className='bg-dark text-secondary fw-bold py-2 text-center'> Weronika Ścibior &copy; 2022</div>
      </footer>
      </main>
    </>
    )
  }
}
export default App;