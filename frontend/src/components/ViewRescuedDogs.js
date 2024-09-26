import React, { useState, useEffect, Fragment } from "react"
import { Table, Button, Card, Form, Modal } from "react-bootstrap"
import axios from "axios"
import { FaPencilAlt, FaTrashAlt, FaLock } from "react-icons/fa"
import { Link } from "react-router-dom"
import jsPDF from "jspdf"

function ViewRescuedDogs(props) {
  const [rescuedDogs, setRescuedDogs] = useState([])
  const [search, setSearch] = useState("")
  const [state, setState] = useState("adopted")
  const [show, setShow] = useState(false)
  const [values, setValues] = useState({})
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  )

  const [formData, setFormData] = useState({
    rescuerName: "",
    rescuerContactNo: "",
    registerdDate: "",
    description: "",
    dogName: "",
    dogColour: "",
    weight: "",
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    function getRescuedDogs() {
      axios
        .get("http://localhost:8000/createRescuedDog/")
        .then((res) => {
          setRescuedDogs(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    getRescuedDogs()
  }, [])

  const onDelete = (_id) => {
    const r = window.confirm("Do you really want to Remove this Record?")
    if (r === true) {
      axios.delete(`http://localhost:8000/createRescuedDog/delete/${_id}`)
      alert("Deleted Successfully")
      window.location.reload()
    } else {
      window.location.reload()
    }
  }

  const update = (_id) => {
    window.location = `/adoption/${_id}`
  }

  const createPDF = (
    _id,
    dogName,
    dogColour,
    weight,
    age,
    gender,
    perspectivePetParents,
    contactNo,
    adoptDate
  ) => {
    const unit = "pt"
    const size = "A4"
    const orientation = "landscape"
    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)
    const title = `**** DOGGIE CARE PUPPY'S REPORT CARD ****    (Dog ID- ${_id})`
    const doggieName = `Puppy's Name: ${dogName}`
    const doggieColour = `Colour: ${dogColour}`
    const dogWeight = `Weight: ${weight}Kg`
    const dogAge = `Age: ${age}`
    const doggender = `Gender: ${gender}`
    const owner = `New Owner: Mr/Ms.${perspectivePetParents}`
    const ownerContactNo = `Contact Number: ${contactNo}`
    const dogadoptDate = `Adopt Date: ${adoptDate}`

    const image2 =
      "https://res.cloudinary.com/dorcq99nr/image/upload/v1665646657/DoggieCare/black_sgno4i.jpg"
    const success = `Thank you, ${perspectivePetParents} on taking home a puppy. We are committed to providing you with quality services.`

    const lefts = 450
    const tops = 200
    const imgWidths = 350
    const imgHeights = 250
    doc.setFontSize(15)
    doc.text(200, 40, title)
    doc.text(60, 200, doggieName)
    doc.text(60, 240, doggieColour)
    doc.text(60, 280, dogWeight)
    doc.text(60, 320, dogAge)
    doc.text(60, 360, doggender)
    doc.text(60, 400, owner)
    doc.text(60, 440, ownerContactNo)
    doc.text(60, 480, dogadoptDate)
    doc.addImage(image2, "PNG", lefts, tops, imgWidths, imgHeights)
    doc.text(60, 100, success)
    doc.save(`${dogName}'s ReportCard.pdf`)
  }

  const UpdatePuppiesDeatails = (val) => {
    setValues(val)
    handleShow()
  }

  const sendData = (e) => {
    e.preventDefault()

    const updateRescuedDog = {
      id: values._id,
      rescuerName: formData.rescuerName || values.rescuerName,
      rescuerContactNo: formData.rescuerContactNo || values.rescuerContactNo,
      registerdDate: formData.registerdDate || values.registerdDate,
      description: formData.description || values.description,
      dogName: formData.dogName || values.dogName,
      dogColour: formData.dogColour || values.dogColour,
      weight: formData.weight || values.weight,
      age: formData.age || values.age,
      gender: formData.gender || values.gender,
      perspectivePetParents:
        formData.perspectivePetParents || values.perspectivePetParents,
      contactNo: formData.contactNo || values.contactNo,
      buildingNo: formData.buildingNo || values.buildingNo,
      street: formData.street || values.street,
      city: formData.city || values.city,
      adoptDate: formData.adoptDate || values.adoptDate,
      status: formData.status || values.status,
    }

    axios
      .put(
        `http://localhost:8000/createRescuedDog/updateAdoptDog/${updateRescuedDog.id}`,
        updateRescuedDog
      )
      .then(() => {
        alert("Dog Details Updated Successfully")
        handleClose()
        window.location = `/viewstrayPuppies`
      })
      .catch((err) => {
        console.log(err)
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
      <div
        style={{
          paddingLeft: "10vh",
          color: "white",
          paddingTop: "4vh",
        }}
      >
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
              <h1 style={{ color: "white" }}>View Puppies Details</h1>
              <div
                style={{
                  paddingLeft: "10vh",
                  paddingBottom: "1vh",
                  paddingTop: "1vh",
                }}
              >
                <div
                  style={{
                    paddingLeft: "2vh",
                    paddingBottom: "1vh",
                    paddingTop: "1vh",
                  }}
                >
                  <div
                    style={{
                      paddingBottom: "1vh",
                      paddingTop: "1vh",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search from 'Name' "
                      className="mr-2"
                      onChange={(e) => {
                        setSearch(e.target.value)
                      }}
                    />
                  </div>
                  {space2}
                  {space2}
                  {space2}
                  {space2}
                  {space2}
                  {space2}
                  {space2}
                  {space2}
                  <Link to="/rescuedDogRegistration">
                    <Button style={{ backgroundColor: "blue" }}>
                      REGISTER
                    </Button>
                  </Link>
                  &nbsp;
                  <Link to="/registerResDog">
                    <Button style={{ backgroundColor: "blue" }}>
                      REGISTER STRAY DOGS
                    </Button>
                  </Link>
                </div>
              </div>
              <Table striped bordered hover size="sm" variant="light">
                <thead>
                  <tr>
                    <th>Registerd Date</th>
                    <th>Dog Name</th>
                    <th>Dog Colour</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Perspective Pet Parents</th>
                    <th>Contact No</th>
                    <th>Adopt Date</th>
                    <th>Status</th>
                    <th>Download Report Card</th>
                    <th>Edit</th>
                    <th>Adopt Puppy</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {rescuedDogs
                    .filter((RescuedDogs) => {
                      if (search === "") {
                        return RescuedDogs
                      } else if (
                        RescuedDogs.dogName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return RescuedDogs
                      }
                    })
                    .map((val, key) => {
                      return (
                        <tr key={val._id}>
                          <td>{val.registerdDate}</td>
                          <td>{val.dogName}</td>
                          <td>{val.dogColour}</td>
                          <td>{val.age}</td>
                          <td>{val.gender}</td>
                          <td>{val.perspectivePetParents}</td>
                          <td>{val.contactNo}</td>
                          <td>{val.adoptDate}</td>
                          <td>
                            <button
                              style={{
                                color: state === "adopted" ? "#F00" : "#00F",
                              }}
                            >
                              {val.status}
                            </button>
                          </td>
                          <td>
                            <Button
                              className="generateDogReportCardPdF"
                              onClick={() =>
                                createPDF(
                                  val._id,
                                  val.dogName,
                                  val.dogColour,
                                  val.weight,
                                  val.age,
                                  val.gender,
                                  val.perspectivePetParents,
                                  val.contactNo,
                                  val.adoptDate
                                )
                              }
                            >
                              Report Card
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="outline-success"
                              onClick={() => UpdatePuppiesDeatails(val)}
                            >
                              <FaPencilAlt />
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="outline-success"
                              onClick={() => update(val._id)}
                            >
                              Adopt Puppies
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              onClick={() => onDelete(val._id)}
                            >
                              <FaTrashAlt />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>

              <Modal show={show} onHide={handleClose} className="getfunc">
                <Modal.Header closeButton>
                  <Modal.Title>Update Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form onSubmit={sendData}>
                    <Form.Group controlId="container">
                      <Form.Label for="rescuerName">RescuerName</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={values.rescuerName}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            rescuerName: e.target.value,
                          })
                        }}
                        readOnly="readonly"
                      />
                    </Form.Group>
                    <Form.Group controlId="container">
                      <Form.Label for="rescuerContactNo">
                        rescuerContactNo
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={values.rescuerContactNo}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            rescuerContactNo: e.target.value,
                          })
                        }}
                      />
                    </Form.Group>

                    <Form.Group controlId="container">
                      <Form.Label for="description">description</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={values.description}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }}
                      />
                    </Form.Group>

                    <Form.Group controlId="container">
                      <Form.Label for="dogName">dogName</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={values.dogName}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            dogName: e.target.value,
                          })
                        }}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label for="dogColour">dogColour</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={values.dogColour}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            dogColour: e.target.value,
                          })
                        }}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label for="weight">weight</Form.Label>
                      <Form.Control
                        type="Number"
                        defaultValue={values.weight}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            weight: e.target.value,
                          })
                        }}
                      />
                    </Form.Group>

                    <Button className="final" type="submit">
                      Edit details
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ViewRescuedDogs
