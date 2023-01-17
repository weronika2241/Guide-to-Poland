import { React, useContext } from "react";
import { LanguageContext } from "../App";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

export default function Contacts() {
  const { data } = useContext(LanguageContext);

  const handleonSubmit = (data_contacts) => sendContacts(data_contacts);

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "all",
  });

  function sendContacts(data_contacts) {
    fetch("/api/getContactsData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstnameContacts: data_contacts.firstName_contacts,
        lastnameContacts: data_contacts.lastName_contacts,
        phoneContacts: data_contacts.phone_contacts,
        emailContacts: data_contacts.email_contacts,
        textContacts: data_contacts.text_contacts,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <>
      <div className=" container-fluid py-5 bg-dark">
        <h2 className="fw-normal px-5 mx-3 text-light">{data["contact"]}</h2>

        <Form id="contacts" onSubmit={handleSubmit2(handleonSubmit)}>
          <Row className="justify-content-sm-center">
            <Col sm={6} className="col-md-5">
              <Form.Control
                className="my-2"
                placeholder={data["first_name"]}
                {...register2("firstName_contacts", {
                  pattern: /^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/,
                  required: true,
                })}
              />
              {errors2?.firstName_contacts?.type === "pattern" && (
                <p className="errors">{data["Alphabetical characters only"]}</p>
              )}
              {errors2?.firstName_contacts?.type === "required" && (
                <p className="errors">{data["Required field"]}</p>
              )}

              <Form.Control
                className="my-2"
                placeholder={data["last_name"]}
                {...register2("lastName_contacts", {
                  pattern: /^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/,
                  required: true,
                })}
              />
              {errors2?.lastName_contacts?.type === "pattern" && (
                <p className="errors">{data["Alphabetical characters only"]}</p>
              )}
              {errors2?.lastName_contacts?.type === "required" && (
                <p className="errors">{data["Required field"]}</p>
              )}

              <Form.Control
                className="email my-2"
                placeholder="E-mail"
                {...register2("email_contacts", {
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  required: true,
                })}
              />
              {errors2?.email_contacts?.type === "required" && (
                <p className="errors">{data["Required field"]}</p>
              )}
              {errors2?.email_contacts?.type === "pattern" && (
                <p className="errors">{data["It's not a good e-mail"]}</p>
              )}
            </Col>
            <Col sm={6} className="col-md-5 ">
              <Form.Control
                className="my-2"
                type="number"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", ",", "."].includes(e.key) &&
                  e.preventDefault()
                }
                placeholder={data["phone"]}
                {...register2("phone_contacts", {
                  pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
                  minLength: 9,
                  required: true,
                })}
              />
              {errors2?.phone_contacts?.type === "pattern" && (
                <p className="errors">{data["It's not a number"]}</p>
              )}
              {errors2?.phone_contacts?.type === "minLength" && (
                <p className="errors">{data["Not enough digits"]}</p>
              )}
              {errors2?.phone_contacts?.type === "required" && (
                <p className="errors">{data["Required field"]}</p>
              )}

              <FloatingLabel
                controlId="floatingTextarea2"
                label={data["Text message"]}
              >
                <Form.Control
                  className="my-2"
                  as="textarea"
                  placeholder={data["Text message"]}
                  style={{ height: "90px" }}
                  {...register2("text_contacts", { required: true })}
                />
                {errors2?.text_contacts?.type === "required" && (
                  <p className="errors">{data["Required field"]}</p>
                )}
              </FloatingLabel>
            </Col>
          </Row>
          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="my-3 mx-5 px-5"
            >
              {data["send"]}
            </Button>
          </div>
        </Form>
      </div>

      <footer fluid>
        <div className="bg-dark text-secondary fw-bold py-2 text-center">
          {" "}
          Weronika Ścibior &copy; 2022
        </div>
      </footer>
    </>
  );
}
