import React, { useState, useEffect, Fragment } from "react"
import { Card, Button, Row, Col, Form } from "react-bootstrap"
import axios from "axios"
import { FaLock } from "react-icons/fa"
import { useParams } from "react-router-dom"

function UpdateHealth() {
  const [dog, setDog] = useState([])
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  )

  let params = useParams()

  const [_id, set_id] = useState(" ")
  const [dogID, setDogID] = useState(" ")
  const [dogName, setDogName] = useState(" ")
  const [sex, setSex] = useState(" ")
  const [dob, setDob] = useState(" ")
  const [weight, setWeight] = useState(" ")
  const [bloodGroup, setBlodGroup] = useState(" ")
  const [disease, setDisease] = useState(" ")
  const [lastDate, setLastDate] = useState(" ")
  const [nextDate, setNextDate] = useState("")
  const [labTests, setLabTests] = useState("")
  const [medicine, setMedicine] = useState("")
  const [doctor, setDoctor] = useState("")

  useEffect(() => {
    //get funtion
    function getDog() {
      console.log(_id)

      axios
        .get(`http://localhost:8000/dog/${params.id}`)
        .then((res) => {
          setDog(res.data)
          set_id(res._id)
          setDogID(res.data.dog.dogID)
          setDogName(res.data.dog.dogName)
          setSex(res.data.dog.sex)
          setDob(res.data.dogs.dob)
          setWeight(res.data.dogs.weight)
          setBlodGroup(res.data.dogs.bloodGroup)
          setDisease(res.data.dogs.disease)
          setLastDate(res.data.dogs.lastDate)
          setNextDate(res.data.dogs.nextDate)
          setLabTests(res.data.dogs.labTests)
          setMedicine(res.data.dogs.medicine)
          setDoctor(res.data.dogs.doctor)

          console.log(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    getDog()
  }, [])

  //update function
  function sendData(e) {
    e.preventDefault()

    const newDog = {
      _id,
      dogID,
      dogName,
      sex,
      dob,
      weight,
      bloodGroup,
      disease,
      lastDate,
      nextDate,
      labTests,
      medicine,
      doctor,
    }

    axios
      .put(`http://localhost:8000/dog/update/${params.id}`, newDog)
      .then(() => {
        alert("Details Edited")
        window.location = "/prescriptions"

        setDogID("")
        setDogName("")
        setSex("")
        setDob("")
        setWeight("")
        setBlodGroup("")
        setDisease("")
        setLastDate("")
        setNextDate("")
        setLabTests("")
        setMedicine("")
        setDoctor("")
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
          paddingLeft: "8vh",
          paddingRight: "13vh",
          paddingTop: "4vh",
          paddingBottom: "4vh",
        }}
      >
        <Card
          style={{
            backgroundColor: "#062464",
          }}
        >
          <div
            style={{
              paddingBottom: "8vh",
              paddingTop: "5vh",
              paddingLeft: "8vh",
              paddingRight: "5vh",
            }}
          >
            <div
              style={{
                paddingBottom: "5vh",
                paddingTop: "5vh",
                paddingLeft: "5vh",
                paddingRight: "5vh",
              }}
            >
              <h1 style={{ color: "white" }}>Appoinments</h1>
              <div
                style={{
                  paddingleft: "10vh",
                  paddingBottom: "1vh",
                  paddingTop: "1vh",
                }}
              >
                <div
                  style={{
                    paddingleft: "2vh",
                    paddingBottom: "1vh",
                    paddingTop: "1vh",
                  }}
                >
                  <div
                    style={{ paddingBottom: "1vh", paddingTop: "1vh" }}
                  ></div>
                </div>
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
                          value={dogID}
                          onChange={(e) => setDogID(e.target.value)}
                          placeholder=" Enter Name"
                          style={{
                            backgroundColor: "#010020",
                            color: "#F62681",
                          }}
                        />
                      </Form.Group>
                    </div>

                    <br />
                  </Col>
                </Row>
                <div style={{ paddingLeft: "50%" }}>
                  <Button type="submit">Edit</Button>
                </div>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default UpdateHealth
