import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaLock } from "react-icons/fa";
import { getMedicineById, updateMedicine} from "../../services/medicineService";

export const UpdateMedicinePage = () => {
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  );
  //retrieve relevent data form relavent fields
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expDate, setExpDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  
  const getMedicine = async () => {
    const medicineResponse = await getMedicineById(id);
    console.log(medicineResponse.data)
    setMedicineName(medicineResponse.data.medicine.medicineName)
    setQuantity(medicineResponse.data.medicine.quantity)
    setExpDate(medicineResponse.data.medicine.expDate)
    setCategory(medicineResponse.data.medicine.category)
    setDescription(medicineResponse.data.medicine.description)
    setImgUrl(medicineResponse.data.medicine.imgUrl)
  };
  
  useEffect(() => {
    getMedicine();
  }, []);

    //update data
    const updateMedicineDetails = async (e) => {
      e.preventDefault();
      const medicine = {
        medicineName,
        quantity,
        expDate,
        category,
        description,
        imgUrl,
      };
      await updateMedicine(id, medicine)
      navigate("/medicines")
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
      <h6 style={{ color: "#A4DE02" }}>Add Medicine</h6>
    </div>
    <div style={{ paddingLeft: "10vh", paddingRight: "10vh" }}>
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
            value={medicineName}
            onChange={(e) => {setMedicineName(e.target.value.replace(/\{/g, '!').replace(/\}/g, '!').replace(/\</g, '.').replace(/\=/g, ' '))}}
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
            value={quantity}
            onChange={(e) => {setQuantity(e.target.value)}}
          />
          <Form.Label>Expiry Date:</Form.Label>
          <Form.Control
            // type="date"
            placeholder="Expiry Date"
            style={{
              backgroundColor: "#010020",
              color: "#F62681",
            }}
            name="expDate"
            value={expDate}
            onChange={(e) => {setExpDate(e.target.value)}}
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
            value={category}
            onChange={(e) => {setCategory(e.target.value)}}
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
            value={description}
            onChange={(e) => {setDescription(e.target.value.replace(/\{/g, '!').replace(/\}/g, '@').replace(/\</g, '.').replace(/\=/g, ' '))}}
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
            value={imgUrl}
            onChange={(e) => {setImgUrl(e.target.value)}}
          />
        </Form.Group>
        <div style={{ paddingLeft: "50%" }}>
          <Button
            type="submit"
            onClick={updateMedicineDetails}
            style={{ backgroundColor: "green" }}
          >
            UPDATE
          </Button>
        </div>
      </Form>
    </div>
  </div>
  )
}
