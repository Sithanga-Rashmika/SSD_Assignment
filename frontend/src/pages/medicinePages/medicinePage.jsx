import React, { useState, Fragment } from "react";
import { createMedicine } from "../../services/medicineService.js";
import "./medicine.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaLock } from "react-icons/fa";

export const MedicinePage = () => {
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  );
  const [inputValues, setInputValues] = useState({
    medicineName: "",
    quantity: "",
    expDate: "",
    category: "",
    description: "",
    imgUrl: "",
  });
  const handleChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };
  const sendMedicineData = async (event) => {
    event.preventDefault();
    await createMedicine(inputValues);

    window.location("/medicines")
  };
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
        <h6 style={{ color: "#A4DE02" }}>Add Medicine</h6>
      </div>
      <div className="formContainer">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Medicine:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Medicine"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="medicineName"
              onChange={(e) => handleChange(e)}
            />
            <Form.Label>QTY:</Form.Label>
            <Form.Control
              type="number"
              placeholder="QTY"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="quantity"
              onChange={(e) => handleChange(e)}
            />
            <Form.Label>Expiry Date:</Form.Label>
            <Form.Control
              type="date"
              placeholder="Expiry Date"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="expDate"
              onChange={(e) => handleChange(e)}
            />
            <Form.Label>Category:</Form.Label>
            <Form.Select
              type="text"
              placeholder="Category"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="category"
              onChange={(e) => handleChange(e)}
            >
              <option>Tablet</option>
              <option>Vaccine</option>
            </Form.Select>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="description"
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Form.Control
              type="text"
              placeholder="url"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="imgUrl"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <div style={{ paddingLeft: "50%" }}>
            <Button
              type="submit"
              onClick={sendMedicineData}
              style={{ backgroundColor: "2F3E6D" }}
            >
              ADD
            </Button>
          </div>
        </Form>
      </div>
      <div className="imageUploadContainer"></div>
    </div>
  );
};
