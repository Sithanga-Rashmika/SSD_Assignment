import React, { useEffect, useState, Fragment } from "react";
import { dogsList } from "../../services/dogService";
import axios from "axios";

import { FaLock } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import {MdEdit, MdDelete} from "react-icons/md";
import { Link } from "react-router-dom";

export const DogList = () => {
  const space2 = (
    <Fragment>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </Fragment>
  );
  const [dogs, setDogs] = useState([]);

  const dogsLists = async () => {
    const dogResponse = await dogsList();
    setDogs(dogResponse.data);
  };

  useEffect(() => {
    dogsLists();
  }, []);

  //   //delete
  // const deleteDoggy = async (id) => {
  //   await deleteDog(id);
  //   dogsLists();
  // };
  //delete funtion
    async function deleteDog(id){        
        await axios.delete(`http://localhost:8000/dog/delete/${id}`).then(() => {
            alert("Dog deleted successfully");
            window.location = `/dogs`;

          
        }).catch((error) => {
            alert(`Failed to delete \n${error.message}`)
        }) 
    } 

  // search bar
  const handleChange = (event) => {};

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
            <h6 style={{ color: "#A4DE02" }}>Dogs List</h6>
          </div>
          <div style={{ display: "flex", flexDirection: "raw" }}>
            <Form.Control
              type="text"
              placeholder="Search...."
              style={{
                backgroundColor: "#010020",
                color: "#F62681",
                width: "30%",
                marginLeft: "120px",
              }}
              name="dogID"
              onChange={(e) => handleChange(e)}
            />
            <BsSearch style={{ margin: "10px" }} />
            {space2}{space2}{space2}{space2}{space2}
        
          </div>
          <div style={{ paddingLeft: "10vh", paddingRight: "10vh" }}>
            {dogs.map((dog) => (
              <div key={dog._id}>
                <div className="medicine-card">
                  <img src={dog.imgUrl} alt="dog" />
                  <br />
                  <MdDelete style={{color: "red", float: "right", margin: "4px" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this record?"
                        )
                      )
                      deleteDog(dog._id);
                    }}
                  />
                <Link to={`/UpdateDog/${dog._id}`}>
                  <MdEdit style={{color: "green", float: "right", margin: "4px" }}/>
                </Link>
                  <br />
                  <p style={{ color: "#A4DE02" }}>{dog.dogID}</p>
                  <br />
                  <p>{dog.dogName}</p>
                  <br />
                  <p>{dog.ownerName}</p>
                  <br />
                  <p>{dog.breed}</p>
                  <br />
                  <p className="description">{dog.sex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
