import { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Row, Col } from "react-bootstrap"
import { FaLock } from "react-icons/fa"
import axios from "axios"

function UpdateDog() {
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  )
  //retrieve relevent data form relavent fields
  const { id } = useParams()
  // const navigate = useNavigate();

  const [dogID, setdogID] = useState("")
  const [dogName, setdogName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [address, setAddress] = useState("")
  const [dob, setDob] = useState("")
  const [breed, setBreed] = useState("")
  const [sex, setSex] = useState("")
  //   const [image, setImage] = useState("");
  const [weight, setWeight] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")
  const [disease, setDisease] = useState("")
  const [lastDate, setLastDate] = useState("")
  const [nextDate, setNextDate] = useState("")
  const [medicine, setMedicine] = useState("")
  const [labTests, setLabTests] = useState("")
  const [doctor, setDoctor] = useState("")

  useEffect(() => {
    axios
      .get(`http://localhost:8000/dog/${id}`)
      .then((dogResponse) => {
        console.log(dogResponse.data.dog)
        setdogID(dogResponse.data.dog.dogID)
        setdogName(dogResponse.data.dog.dogName)
        setOwnerName(dogResponse.data.dog.ownerName)
        setAddress(dogResponse.data.dog.address)
        setDob(dogResponse.data.dog.dob)
        setBreed(dogResponse.data.dog.breed)
        setSex(dogResponse.data.dog.sex)
        setWeight(dogResponse.data.dog.weight)
        setBloodGroup(dogResponse.data.dog.bloodGroup)
        setDisease(dogResponse.data.dog.disease)
        setLastDate(dogResponse.data.dog.lastDate)
        setNextDate(dogResponse.data.dog.nextDate)
        setMedicine(dogResponse.data.dog.medicine)
        setLabTests(dogResponse.data.dog.labTests)
        setDoctor(dogResponse.data.dog.doctor)
      })
      .catch((err) => {
        console.log(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //update data
  function sendUpdateDetails(e) {
    e.preventDefault()
    const dog = {
      dogID,
      dogName,
      ownerName,
      address,
      dob,
      breed,
      sex,
      weight,
      bloodGroup,
      disease,
      lastDate,
      nextDate,
      medicine,
      labTests,
      doctor,
    }

    axios
      .put(`http://localhost:8000/dog/update/${id}`, dog)
      .then(() => {
        alert("Sent sucessfully")
        window.location = `/viewDogs`
      })
      .catch((err) => {
        alert(err)
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
          {space2}
          <FaLock />
        </p>
      </div>
      <div style={{ paddingLeft: "10vh" }}>
        <h6 style={{ color: "#A4DE02" }}>Update General Information</h6>
      </div>
      <div
        className="container col-6"
        style={{ paddingLeft: "10vh", paddingRight: "10vh" }}
        onSubmit={sendUpdateDetails}
      >
        <Form>
          <Row>
            <Col>
              <br />
              <div style={{ paddingLeft: "10vh" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Dog ID:</Form.Label>
                  <Form.Control
                    type="text"
                    id="exampleInputexpenseCategory1"
                    style={{
                      backgroundColor: "#010020",
                      color: "#F62681",
                    }}
                    value={dogID}
                    onChange={(e) => {
                      setdogID(e.target.value)
                    }}
                    disabled
                  />
                  <Form.Label>Dog Name:</Form.Label>
                  <Form.Control
                    type="text"
                    id="exampleInputexpenseCategory1"
                    required={true}
                    style={{
                      backgroundColor: "#010020",
                      color: "#F62681",
                    }}
                    value={dogName}
                    onChange={(e) => {
                      setdogName(e.target.value)
                    }}
                  />
                  <Form.Label>Owner Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Owner Name"
                    id="exampleInputexpenseCategory1"
                    required={true}
                    style={{
                      backgroundColor: "#010020",
                      color: "#F62681",
                    }}
                    value={ownerName}
                    onChange={(e) => {
                      setOwnerName(e.target.value)
                    }}
                  />
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Owner Address"
                    style={{
                      backgroundColor: "#010020",
                      color: "#F62681",
                    }}
                    id="exampleInputexpenseCategory1"
                    required={true}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                    }}
                  />
                </Form.Group>
              </div>

              <br />
            </Col>

            <Col>
              <br />
              <div>
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  style={{
                    backgroundColor: "#010020",
                    color: "#F62681",
                  }}
                  id="exampleInputexpenseCategory1"
                  required={true}
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value)
                  }}
                />
                <Form.Label>Gender:</Form.Label>
                <Form.Select
                  type="text"
                  placeholder="Gender"
                  style={{
                    backgroundColor: "#010020",
                    color: "#F62681",
                  }}
                  id="exampleInputexpenseCategory1"
                  required={true}
                  value={sex}
                  onChange={(e) => {
                    setSex(e.target.value)
                  }}
                >
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
                <Form.Label>Breed:</Form.Label>
                <Form.Select
                  type="text"
                  placeholder="Breed"
                  style={{
                    backgroundColor: "#010020",
                    color: "#F62681",
                  }}
                  id="exampleInputexpenseCategory1"
                  required={true}
                  value={breed}
                  onChange={(e) => {
                    setBreed(e.target.value)
                  }}
                >
                  <option value="Retrievr">Retrievr</option>
                  <option value="German Shepard">German Shepard</option>
                  <option value="Basset Hound">Basset Hound</option>
                  <option value="Rottwlier">Rottwlier</option>
                </Form.Select>
              </div>

              <br />
            </Col>
          </Row>
          <br />
          <div style={{ paddingLeft: "10vh" }}>
            <h6 style={{ color: "#A4DE02" }}>Update Health Information</h6>
          </div>
          <Row>
            <Col>
              <br />
              <div style={{ paddingLeft: "10vh" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Weight :</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Weight"
                    style={{
                      backgroundColor: "#010020",
                      color: "#F62681",
                    }}
                    id="exampleInputexpenseCategory1"
                    required={true}
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value)
                    }}
                  />
                  <Form.Label>Blood Group:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Blood Group"
                    style={{
                      backgroundColor: "#010020",
                      color: "#F62681",
                    }}
                    id="exampleInputexpenseCategory1"
                    required={true}
                    value={bloodGroup}
                    onChange={(e) => {
                      setBloodGroup(e.target.value)
                    }}
                  />
                  <Form.Label>Disease:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Disease"
                    style={{
                      backgroundColor: "#010020",
                      color: "#F62681",
                    }}
                    id="exampleInputexpenseCategory1"
                    required={true}
                    value={disease}
                    onChange={(e) => {
                      setDisease(e.target.value)
                    }}
                  />
                  <Form.Label>Last Visited Date:</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Last Visited Date"
                    style={{
                      backgroundColor: "#010020",
                      color: "#F62681",
                    }}
                    id="exampleInputexpenseCategory1"
                    required={true}
                    value={lastDate}
                    onChange={(e) => {
                      setLastDate(e.target.value)
                    }}
                  />
                </Form.Group>
              </div>

              <br />
            </Col>

            <Col>
              <br />
              <div>
                <Form.Label>Next Appointment Date:</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Next Appointment Date"
                  style={{
                    backgroundColor: "#010020",
                    color: "#F62681",
                  }}
                  id="exampleInputexpenseCategory1"
                  required={true}
                  value={nextDate}
                  onChange={(e) => {
                    setNextDate(e.target.value)
                  }}
                />
                <Form.Label>Medicines :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Medicines"
                  style={{
                    backgroundColor: "#010020",
                    color: "#F62681",
                  }}
                  id="exampleInputexpenseCategory1"
                  required={true}
                  value={medicine}
                  onChange={(e) => {
                    setMedicine(e.target.value)
                  }}
                />
                <Form.Label>Lab Tests Done:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lab Tests Done"
                  style={{
                    backgroundColor: "#010020",
                    color: "#F62681",
                  }}
                  id="exampleInputexpenseCategory1"
                  required={true}
                  value={labTests}
                  onChange={(e) => {
                    setLabTests(e.target.value)
                  }}
                />
                <Form.Label>Veterinary Surgeon:</Form.Label>
                <Form.Select
                  type="text"
                  placeholder="Veterinary Surgeon"
                  style={{
                    backgroundColor: "#010020",
                    color: "#F62681",
                  }}
                  id="exampleInputexpenseCategory1"
                  required={true}
                  value={doctor}
                  onChange={(e) => {
                    setDoctor(e.target.value)
                  }}
                >
                  <option>Dr. John Doe</option>
                  <option>Dr. Melissa Sulivvain</option>
                </Form.Select>
              </div>

              <br />
            </Col>
          </Row>
          <div style={{ paddingLeft: "50%" }}>
            <Button type="submit" style={{ backgroundColor: "green" }}>
              UPDATE
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default UpdateDog
