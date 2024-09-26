import React, { useState, Fragment } from "react";
import "./medicine.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaLock } from "react-icons/fa";
import { createSales } from "../../services/salesService";

export const SalesPage = () => {
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  );
  const [inputValues, setInputValues] = useState({
    medicineName: "",
    soldQuantity: "",
    category: "",
    soldPrice: "",
    remainingAmount: "",
  });
  const handleChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };
  const sendMedicineData = async (event) => {
    event.preventDefault();
    await createSales(inputValues);

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
        <h6 style={{ color: "#A4DE02" }}>Add Sales Details</h6>
      </div>
      <div style={{ paddingLeft: "10vh", paddingRight: "10vh" }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Medicine Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Medicine Name"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="medicineName"
              onChange={(e) => handleChange(e)}
            />
            <Form.Label>Sold Quantity:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Sold Quantity"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="soldQuantity"
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
            <Form.Label>Sold Price:(Rs)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Sold Price for One Unit"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="soldPrice"
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Form.Label>Remaining Amount:(Rs)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Remaining Amount"
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
              }}
              name="remainingAmount"
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
    </div>
  );
};

