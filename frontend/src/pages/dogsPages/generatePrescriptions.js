import React, { useState, useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import axios from "axios";
import { FaFilePdf, FaLock } from "react-icons/fa";
import jsPDF from 'jspdf';

function GeneratePrescriptions(props) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function getPrescriptions() {
      axios.get("http://localhost:8000/dog/").then((res) => {
        setPrescriptions(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getPrescriptions();
  }, [])

  const createPDF = (prescriptionData) => {
    const {
      _id, dogID, dogName, weight, bloodGroup, disease, lastDate, nextDate,
      medicine, labTests, doctor
    } = prescriptionData;

    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const doc = new jsPDF(orientation, unit, size);
    const title = `**** DOGGIE CARE HEALTH REPORT ****    (Dog ID : ${dogID})`;
    const name = `Dog's Name: ${dogName}`;
    const kg = `Weight: ${weight} kg`;
    const group = `Blood Group: ${bloodGroup}`;
    const diseas = `Disease :${disease}`;
    const last = `Last Visited Date: ${lastDate}`;
    const next = `Next Appointment Date: ${nextDate}`;
    const med = `Given Medicines: ${medicine}`;
    const tests = `Lab Tests Done: ${labTests}`;
    const vet = `Veterinary Surgeon: ${doctor}`;

    const image2 = "https://th.bing.com/th/id/R.709304af5fc11b7bb0c2a3a104485ffd?rik=8LN%2ftXvFwzq2LA&riu=http%3a%2f%2fwww.petdialog.co.uk%2fDog%2f_Images%2fhealth-dog.jpg&ehk=UWG3xTlqqHjhsHWhTi5OTGwpvCXDAL5pQlEDp4lp3MU%3d&risl=&pid=ImgRaw&r=0"
    const success = `Welcome to Doggy Care Veterinary Services !`

    const lefts = 450;
    const tops = 200;
    const imgWidths = 350;
    const imgHeights = 300;
    doc.setFontSize(15);
    doc.text(200, 40, title);
    doc.text(60, 200, name);
    doc.text(60, 240, kg);
    doc.text(60, 280, group);
    doc.text(60, 320, diseas);
    doc.text(60, 360, last);
    doc.text(60, 400, next);
    doc.text(60, 440, med);
    doc.text(60, 480, tests);
    doc.text(60, 520, vet);
    doc.addImage(image2, 'PNG', lefts, tops, imgWidths, imgHeights);
    doc.text(60, 100, success);
    doc.save(`${dogID}'s Prescription.pdf`);
  }

  return (
    <div style={{
      backgroundColor: '#010020',
      width: '100%',
      height: '1000px'
    }}>
      <div style={{ paddingLeft: "10vh", color: 'white', paddingTop: '4vh' }}>
        <p >Doggie Care   {Array(12).fill("\u00A0")}<FaLock /></p>
      </div>
      <div style={{ paddingLeft: '8vh', paddingRight: '13vh', paddingTop: '4vh', paddingBottom: '4vh' }}>
        <Card style={{
          backgroundColor: '#062464',
        }}>
          <div style={{ paddingBottom: "8vh", paddingTop: "5vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
            <div style={{ paddingBottom: "5vh", paddingTop: "5vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
              <h1 style={{ color: 'white' }}>Get Prescriptions</h1>
              <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >
                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                  <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                    <input type="text" placeholder="Search from 'ID' " className="mr-2"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }} />
                  </div>
                </div>
              </div>
              <Table striped bordered hover size="sm" variant="light" >
                <thead>
                  <tr>
                    <th>Dog ID</th>
                    <th>Dog Name</th>
                    <th>Owner Name</th>
                    <th>Address</th>
                    <th>Breed</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Weight</th>
                    <th>Blood Group</th>
                    <th>Disease</th>
                    <th>Last Visited Date</th>
                    <th>Next Date</th>
                    <th>Medicines</th>
                    <th>Lab Tests</th>
                    <th>Veterinary Suregon</th>
                    <th>Prescriptions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.filter(Prescriptions => {
                    if (search === "") {
                      return Prescriptions
                    }
                    else if (Prescriptions.dogID.toLowerCase().includes(search.toLowerCase())) {
                      return Prescriptions
                    }
                  }).map((Prescriptions) => {
                    return (
                      <tr key={Prescriptions._id}>
                        <td>{Prescriptions.dogID}</td>
                        <td>{Prescriptions.dogName}</td>
                        <td>{Prescriptions.ownerName}</td>
                        <td>{Prescriptions.address}</td>
                        <td>{Prescriptions.breed}</td>
                        <td>{Prescriptions.sex}</td>
                        <td>{Prescriptions.dob}</td>
                        <td>{Prescriptions.weight}</td>
                        <td>{Prescriptions.bloodGroup}</td>
                        <td>{Prescriptions.disease}</td>
                        <td>{Prescriptions.lastDate}</td>
                        <td>{Prescriptions.nextDate}</td>
                        <td>{Prescriptions.medicine}</td>
                        <td>{Prescriptions.labTests}</td>
                        <td>{Prescriptions.doctor}</td>
                        <td>
                          <Button variant="outline-danger" onClick={() => createPDF(Prescriptions)}>
                            <FaFilePdf />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GeneratePrescriptions;
