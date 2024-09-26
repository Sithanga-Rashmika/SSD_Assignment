import React, { useEffect, useState, Fragment } from "react";
import { getMedicine, deleteMedicine, searchMedicine } from "../../services/medicineService";
import { FaLock } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import {MdEdit, MdDelete} from "react-icons/md";
import Button from "react-bootstrap/esm/Button";
import { Link} from "react-router-dom";

export const MedicineDetailsPage = () => {
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  );
  const [medicines, setMedicines] = useState([]);

  const getMedicines = async () => {
    const medicineResponse = await getMedicine();
    setMedicines(medicineResponse.data);
  };

  useEffect(() => {
    getMedicines();
  }, []);

    //delete
  const deleteMed = async (id) => {
    await deleteMedicine(id);
    getMedicines();
  };

  // search bar
  const searchHandle = async(event) => {
    let key = event.target.value;
    if(key){
      let medicineResponse = await searchMedicine(key)
      // medicineResponse = await medicineResponse.data.json()
      if(medicineResponse){
        setMedicines(medicineResponse.data)
      }
    }else{
      getMedicines();
    }
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
      <div
        style={{
          backgroundColor: "#010020",
          width: "100% ",
          height: "1000px",
        }}
      >
        <div
          style={{
            backgroundColor: "#010020",
            width: "100% ",
            height: "1000px",
          }}
        >
          <div style={{ paddingLeft: "10vh" }}>
            <h6 style={{ color: "#A4DE02" }}>Medicines</h6>
          </div>
          <div style={{ display: "flex", flexDirection: "raw" }}>
            <Form.Control
              className="searchbar"
              type=""
              placeholder="Search by name or category...."
              name="medicineName"
              onChange={searchHandle}
            />
            <BsSearch style={{ margin: "10px" }} />
            {space2}{space2}{space2}{space2}
          <Link to='/sales'>
          <Button style={{backgroundColor: "blue" }}>ADD SALES</Button>
        </Link>
        &nbsp;
        <Link to='/salesreport'>
        <Button style={{backgroundColor: "#FF003D" }}>GENERATE SALES REPORT</Button>
      </Link>
          </div>
          <div style={{ paddingLeft: "10vh", paddingRight: "10vh" }}>
            {medicines.length > 0 ? medicines.map((medicine) => (
              <div key={medicine._id}>
                <div className="medicine-card">
                  <img src={medicine.imgUrl} alt="medicine" />
                  <br />
                  <MdDelete style={{color: "red", float: "right", margin: "4px" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this record?"
                        )
                      )
                      deleteMed(medicine._id);
                    }}
                  />
                <Link to={`/updatemedicine/${medicine._id}`}>
                  <MdEdit style={{color: "green", float: "right", margin: "4px" }}/>
                </Link>
                  <br />
                  <p style={{ color: "#A4DE02" }}>{medicine.medicineName}</p>
                  <br />
                  <p>{medicine.quantity}</p>
                  <br />
                  <p>{medicine.expDate}</p>
                  <br />
                  <p>{medicine.category}</p>
                  <br />
                  <p className="description">{medicine.description}</p>
                </div>
              </div>
            )):<h1>Medicine Not Found</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};
