import React, { useState, Fragment } from "react"
import { FaLock } from "react-icons/fa"
import { Card, Button, Row, Col, Form } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"

export default function AddDog() {
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  )
  const [dogID, setdogID] = useState("")
  const [dogName, setdogName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [address, setAddress] = useState("")
  const [dob, setDob] = useState("")
  const [breed, setBreed] = useState("")
  const [sex, setSex] = useState("")

  function sendData(e) {
    e.preventDefault()

    const newDog = {
      dogID,
      dogName,
      ownerName,
      address,
      dob,
      breed,
      sex,
    }

    axios
      .post("http://localhost:8000/dog/add", newDog)
      .then(() => {
        ("Dog added")
        setdogID("")
        setdogName("")
        setOwnerName("")
        setAddress("")
        setDob("")
        setBreed("")
        setSex("")

        alert("New dog added")
        window.location = `/viewDogs`
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
                  <h6 style={{ color: "#A4DE02" }}>Add Dogs</h6>
                </div>

                <Form onSubmit={sendData}>
                  <Row>
                    <Col>
                      <br />
                      <div style={{ paddingLeft: "10vh" }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Dog ID :{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdogID(e.target.value)}
                            required={true}
                            placeholder=" Ex:Dog_01"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Dog Name:{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdogName(e.target.value)}
                            required={true}
                            placeholder=" Enter Name"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Owner Name:{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setOwnerName(e.target.value)}
                            required={true}
                            placeholder=" Enter Owner name"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Address:{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setAddress(e.target.value.replace(/[<>{}=]/g, (match) => {
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
                            required={true}
                            placeholder=" 23/C, Colombo"
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
                            Date of Birth:{" "}
                          </Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) => setDob(e.target.value)}
                            required={true}
                            placeholder="Select Date"
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Sex
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setSex(e.target.value)}
                            required={true}
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          >
                            <option>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: "white" }}>
                            Breed
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setBreed(e.target.value)}
                            required={true}
                            style={{
                              backgroundColor: "#010020",
                              color: "#F62681",
                            }}
                          >
                            <option>Select Type</option>
                            <option value="Retrievr">Retrievr</option>
                            <option value="German Shepard">
                              German Shepard
                            </option>
                            <option value="Basset Hound">Basset Hound</option>
                            <option value="Rottwlier">Rottwlier</option>
                          </Form.Select>
                        </Form.Group>
                      </div>

                      <br />
                    </Col>
                  </Row>
                  <div style={{ paddingLeft: "50%" }}>
                    <Button type="submit">ADD</Button>
                  </div>
                  <Link to={`/`} className="btn btn-sm expenseButton">
                    {" "}
                    CANCEL
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  )
}
