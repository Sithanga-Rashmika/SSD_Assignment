import React, { useState, Fragment } from "react"
import { FaLock } from "react-icons/fa"
import { Card, Button, Row, Col, Form } from "react-bootstrap"
import axios from "axios"

export default function DogRegistration() {
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  )
  const [rescuerName, setRescuerName] = useState(" ")
  const [rescuerContactNo, setRescuerContactNo] = useState(" ")
  const [registerdDate, setRegisterdDate] = useState(" ")
  const [description, setDescription] = useState(" ")
  const [dogName, setDogName] = useState(" ")
  const [dogColour, setDogColour] = useState(" ")
  const [weight, setWeight] = useState(" ")
  const [age, setAge] = useState(" ")
  const [gender, setGender] = useState(" ")

  function sendData(e) {
    e.preventDefault()

    const newRescuedDog = {
      rescuerName,
      rescuerContactNo,
      registerdDate,
      description,
      dogName,
      dogColour,
      weight,
      age,
      gender,
    }

    axios
      .post("http://localhost:8000/createRescuedDog/add", newRescuedDog)
      .then(() => {
        setRescuerName("")
        setRescuerContactNo("")
        setRegisterdDate("")
        setDescription("")
        setDogName("")
        setDogColour("")
        setWeight("")
        setAge("")
        setGender("")

        alert("Dog added ")
        window.location = `/viewstrayPuppies`
      })
      .catch((err) => {
        alert("error")
      })
  }

  return (
    <div
      style={{
        backgroundColor: "#010020",
        width: "100% ",
        height: "1000px",
      }}
    >
      <div style={{ paddingLeft: "10vh", color: "white", paddingTop: "4vh" }}>
        <p>
          Doggie Care {space2}
          {space2}
          {space2}
          {space2}
          {space2}
          {space2}
          {space2}
          {space2}
          {space2}
          {space2}
          {space2}
          <FaLock />
        </p>
      </div>
      <div
        style={{
          paddingLeft: "7vh",
          paddingRight: "7vh",
          paddingTop: "3vh",
          paddingBottom: "3vh",
        }}
      >
        <Card
          style={{
            backgroundColor: "#062464",
          }}
        >
          <div
            style={{
              paddingLeft: "8vh",
              paddingRight: "9vh",
              paddingTop: "4vh",
              paddingBottom: "4vh",
            }}
          >
            <Card
              style={{
                backgroundColor: "#010020",
              }}
            >
              <Card.Body>
                <div style={{ paddingLeft: "1vh" }}>
                  <h6 style={{ color: "#A4DE02" }}>Register Stray Puppy</h6>
                </div>

                <Form onSubmit={sendData}>
                  <Row>
                    <Col>
                      <br />
                      <div style={{ paddingLeft: "10vh" }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Rescuer Name:{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => {
                              const sanitizedValue = e.target.value.replace(/[<>&'"]/g, (char) => {
                                const entities = {
                                  '<': '&lt;',
                                  '>': '&gt;',
                                  '&': '&amp;',
                                  "'": '&#39;',
                                  '"': '&quot;'
                                };
                                return entities[char];
                              });
                              setRescuerName(sanitizedValue);
                            }}
                            placeholder=" Enter Rescuer Name"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Rescuer's Contact No*:{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={10}
                            onChange={(e) =>
                              setRescuerContactNo(e.target.value)
                            }
                            placeholder=" Enter Rescuer''s Contact No"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Registerd Date*:{" "}
                          </Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) => setRegisterdDate(e.target.value)}
                            placeholder=" Enter Registerd Date"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Description:{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            rows={2}
                            onChange={(e) => setDescription(e.target.value.replace(/[<>{}=]/g, (match) => {
                              // Replace each match with the corresponding replacement character
                              const replacements = {
                                '<': ',',
                                '>': '.',
                                '{': ';',
                                '}': "'",
                                '=': '!',
                              };
                              return replacements[match];
                            })
                        )}
                            placeholder=" Enter Reason"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>
                      </div>

                      <br />
                    </Col>
                    <Col>
                      <br />
                      <div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Dog Name*:{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setDogName(e.target.value)}
                            placeholder=" Enter Dog Name"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Dog Colour:{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setDogColour(e.target.value)}
                            placeholder=" Enter Dog Colour"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Weight:{" "}
                          </Form.Label>
                          <Form.Control
                            type="Number"
                            max={100}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder=" Enter Weight"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Age
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setAge(e.target.value)}
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          >
                            <option>Select the Age Range</option>
                            <option value="below 1 year">below 1 year</option>
                            <option value="1-5 years">1-5 years</option>
                            <option value="Above 5 years">Above 5 years</option>
                          </Form.Select>
                        </Form.Group>
                      </div>

                      <br />
                    </Col>
                  </Row>
                  <div style={{ paddingLeft: "45%" }}>
                    <Button
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Register Stray Puppy
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  )
}
