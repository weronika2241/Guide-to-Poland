import { React, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { LanguageContext } from "../App";
import { useForm } from "react-hook-form";

export default function Tickets() {

  const { data } = useContext(LanguageContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => send_TicketData(data);

  //Formularz Tickets, pobieranie list miejsc z bazy danych
  const [places, setPlaces] = useState([]);
  const [city, setCity] = useState([]);

  function Get_places(event) {
    setCity(event.target.value);
    setPrice(0);
    setPriceNormal(0);
    setPriceReduced(0);
    fetch("/api/get_places/" + event.target.value)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setPlaces(result);
      });
    const $select = document.querySelector("#location");
    $select.value = "0";
    const $price1 = document.querySelector("#Price_1");
    $price1.value = "";
    const $price2 = document.querySelector("#Price_2");
    $price2.value = "";
  }

  // Hooki do pobierania danych z formularza Tickets

  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  // Zabezpieczone ładowanie strony

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // po załadowaniu strony pobiera miasta
    fetch("/api/get_citys")
      .then((res) => res.json())
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
      );
  }, []);

  //Obliczanie ceny biletów
  const [price, setPrice] = useState(0);
  const [numberNormal, setNumberNormal] = useState(0);
  const [numberReduced, setNumberReduced] = useState(0);

  function send_TicketData(data) {
    fetch("/api/getTicketData", {
      //wysyłanie do backendu zapytanie
      method: "POST", // wysyłamy dane
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: data.firstName, // zmienna / to co wpisał uzytkownik
        lastname: data.lastName,
        phone: data.phone,
        date: date,
        email: data.email,
        city: city,
        price: price,
        ticker_normal: numberNormal,
        ticker_reker_reduced: numberReduced,
        location: place,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.le.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  function setPrice_1(event) {
    let number = event.target.value;
    if (number) {
      setPrice(
        parseInt(event.target.value) * parseInt(priceNormal) +
          parseInt(numberReduced) * parseInt(priceReduced)
      );
    } else {
      setPrice(
        parseInt(0) * parseInt(priceNormal) +
          parseInt(numberReduced) * parseInt(priceReduced)
      );
    }

    if (!number && !numberReduced) {
      setPrice(0);
    }
    setNumberNormal(event.target.value);
  }

  function setPrice_2(event) {
    let number = event.target.value;
    if (number) {
      setPrice(
        parseInt(event.target.value) * parseInt(priceReduced) +
          parseInt(numberNormal) * parseInt(priceNormal)
      );
    } else {
      setPrice(
        parseInt(0) * parseInt(priceReduced) +
          parseInt(numberNormal) * parseInt(priceNormal)
      );
    }

    if (!number && !numberNormal) {
      setPrice(0);
    }

    setNumberReduced(event.target.value);
  }
  const [priceNormal, setPriceNormal] = useState(0);
  function GetPriceNormal(place) {
    setPrice(0);
    const $price1 = document.querySelector("#Price_1");
    $price1.value = "";
    const $price2 = document.querySelector("#Price_2");
    $price2.value = "";
    setNumberReduced(0);
    setNumberNormal(0);
    fetch("/api/get_PriceNormal/" + city + "/" + place)
      .then((res) => res.json())
      .then((result) => {
        setPriceNormal(result.price);
        console.log("Normal: " + result.price);
      });
    setPlace(place);
  }

  const [priceReduced, setPriceReduced] = useState(0);
  function GetPriceReduced(place) {
    setPrice(0);
    const $price1 = document.querySelector("#Price_1");
    $price1.value = "";
    const $price2 = document.querySelector("#Price_2");
    $price2.value = "";
    setNumberReduced(0);
    setNumberNormal(0);
    fetch("/api/get_PriceReduced/" + city + "/" + place)
      .then((res) => res.json())
      .then((result) => {
        setPriceReduced(result.price);
        console.log("Reduced: " + result.price);
      });
    setPlace(place);
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="tickets"
      className="container-sm border thumbnail rounded mb-5"
      style={{ background: "#F5F5F5" }}
    >
      <h2 className="px-5 mx-5 py-3 fw-normal">{data["ticket"]}</h2>
      <Form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-sm-center">
          <Col lg="4">
            <Form.Control
              className="my-3"
              placeholder={data["first_name"]}
              {...register("firstName", {
                pattern: /^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/,
                required: true,
              })}
            />
            {errors?.firstName?.type === "pattern" && (
              <p className="errors">{data["Alphabetical characters only"]}</p>
            )}
            {errors?.firstName?.type === "required" && (
              <p className="errors">{data["Required field"]}</p>
            )}
          </Col>
          <Col lg="4">
            <Form.Control
              className="my-3"
              placeholder={data["last_name"]}
              {...register("lastName", {
                pattern: /^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/,
                required: true,
              })}
            />
            {errors?.lastName?.type === "pattern" && (
              <p className="errors">{data["Alphabetical characters only"]}</p>
            )}
            {errors?.lastName?.type === "required" && (
              <p className="errors">{data["Required field"]}</p>
            )}
          </Col>
        </Row>
        <Row className="justify-content-sm-center">
          <Col lg="4">
            <Form.Control
              className="my-3"
              placeholder="E-mail"
              {...register("email", {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                required: true,
              })}
            />
            {errors?.email?.type === "pattern" && (
              <p className="errors">{data["It's not a good e-mail"]}</p>
            )}
            {errors?.email?.type === "required" && (
              <p className="errors">{data["Required field"]}</p>
            )}
          </Col>
          <Col lg="4">
            <Form.Control
              className="my-3"
              maxLength={"9"}
              placeholder={data["phone"]}
              {...register("phone", {
                pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
                minLength: 9,
                required: true,
              })}
            />
            {errors?.phone?.type === "pattern" && (
              <p className="errors">{data["It's not a number"]}</p>
            )}
            {errors?.phone?.type === "minLength" && (
              <p className="errors">{data["Not enough digits"]}</p>
            )}
            {errors?.phone?.type === "required" && (
              <p className="errors">{data["Required field"]}</p>
            )}
          </Col>
        </Row>
        <Row className="justify-content-sm-center">
          <Col lg="8">
            <Form.Select
              className="my-3 mb-4 form-select"
              aria-lbel="Default select example"
              onChange={Get_places}
            >
              <option>{data["select city"]} </option>

              {items.map((item) => (
                <option value={item.City}>{data[item.City]}</option>
              ))}
            </Form.Select>

            <Form.Select
              id="location"
              className="my-3"
              aria-label="Default select example"
              onChange={(event) => {
                GetPriceNormal(event.target.value);
                GetPriceReduced(event.target.value);
              }}
            >
              <option value="0"> {data["select location"]} </option>

              {places.map((item) => (
                <option value={item.Place}>{data[item.Place]}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="justify-content-sm-center">
          <Col lg="3">
            <Form.Group controlId="dob">
              <Form.Label>{data["select date"]}</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                placeholder="Date of visit"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Control
              id="Price_1"
              type="number"
              onKeyDown={(e) =>
                ["e", "E", "+", "-", ",", "."].includes(e.key) &&
                e.preventDefault()
              }
              className="my-3"
              placeholder={data["Number of normal tickets"]}
              onChange={setPrice_1}
            />
            <Form.Control
              id="Price_2"
              type="number"
              onKeyDown={(e) =>
                ["e", "E", "+", "-", ",", "."].includes(e.key) &&
                e.preventDefault()
              }
              className="my-3"
              placeholder={data["Number of reduced tickets"]}
              onChange={setPrice_2}
            />
          </Col>
          <Col lg="2"></Col>
          <Col lg="3">
            <h5 className="mt-5 pt-2">
              {data["price"]} {price}zł
            </h5>
            <Button size="lg" className="my-5" type="submit">
              {data["booking"]}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
