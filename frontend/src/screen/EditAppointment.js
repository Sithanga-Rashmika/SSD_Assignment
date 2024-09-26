import React, { useState, useEffect, Fragment } from "react";
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function EditAppointment(props) {
  const [appointment, setappointment] = useState([]);
  const [search, setSearch] = useState("");
  const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>

  let params = useParams();

  const [_id, set_id] = useState(" ");
  const [name, setName] = useState(" ");
  const [contact, setContact] = useState(" ");
  const [nic, setNIC] = useState(" ");
  const [dogid, setdogid] = useState(" ");
  const [fee, setfee] = useState(" ");
  const [date, setdate] = useState(" ");
  const [time, settime] = useState(" ");
  const [reason, setreason] = useState(" ");

  useEffect(() => {

    //get funtion
    function getappointment() {

      console.log(_id);

      axios.get(`http://localhost:8000/appointment/${params.id}`).then((res) => {

        setappointment(res.data);
        set_id(res._id);
        setName(res.data.appointments.name);
        setContact(res.data.appointments.contact);
        setNIC(res.data.appointments.nic);
        setdogid(res.data.appointments.dogid);
        setfee(res.data.appointments.fee);
        setdate(res.data.appointments.date);
        settime(res.data.appointments.time);
        setreason(res.data.appointments.reason);
        console.log(res.data.appointments.name);
        console.log(res.data);

      }).catch((err) => {
        alert(err.message);
      })
    }
    getappointment();
  }, [])




  //update function
  function sendData(e) {

    e.preventDefault();

    const newAppointment = {
      _id,
      name,
      contact,
      nic, dogid, fee, date, time, reason
    }

    axios.put(`http://localhost:8000/appointment/${params.id}`, newAppointment).then(() => {
      alert("Appointment Edited");
      window.location = '/viewappointment';

      setName('');
      setContact('');
      setNIC('');
      setdogid('');
      setfee('');
      setdate('');
      settime('');
      setreason('');

    }).catch((err) => {
      alert("error");
    })
  }

  const createPDF = (_id,name,contact,nic,dogid,fee,date,time,reason) =>{
    console.log(_id);
    console.log(name);
    console.log(contact);
    console.log(nic);
    console.log(dogid);
    console.log(fee);
    console.log(date);

const unit = "pt";
const size = "A4"; //page size
const orientation = "landscape";
const marginLeft = 40;
const doc = new jsPDF( orientation , unit , size ); //create document
const title = `| Doggie Care |- ID: ${_id} `;
const Name = ` Name: ${name} `;
const Contacts = `Contact Number: ${contact} `;
const nicNos = `NIC Number: ${nic} `;
const dogids = `Dog ID: ${dogid} `;
const fees=`Fee :  ${fee}`;
const dates=`Date :  ${date}`;
const times=`Time :  ${time}`;
const reasons=`Reason :  ${reason}`;

const image =  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROt9-zXE9zh5zB4QlMQPrD40B8RFTXA-XOfQ&usqp=CAU"; 
const back ="https://static.vecteezy.com/system/resources/previews/006/208/937/original/continuous-line-drawing-style-of-dog-head-free-vector.jpg";
const left = 30;
const top = 8;
const imgWidth = 200;
const imgHeight = 200;   
const lefts = 500;
const tops = 300;
const imgWidths = 300;
const imgHeights = 300;
doc.setFontSize( 20 );
doc.text (250, 40,title);
doc.text(80, 200, Name);  
doc.text(80, 250, Contacts);  
doc.text(80, 300, nicNos);  
doc.text(80, 350, dogids);  
doc.text(80, 400, fees); 
doc.text(80, 450, dates); 
doc.text(80, 500, times); 
doc.text(80, 550, reasons); 
doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);
doc.addImage(back, 'PNG', lefts, tops, imgWidths, imgHeights);
   doc.save (`DogCare${dogid}.pdf`)
}

     

  return (
    <div style={{
      backgroundColor: '#010020',
      width: '100% ',
      height: '1000px'
    }}>
      <div style={{ paddingLeft: "10vh", color: 'white', paddingTop: '4vh' }}>
        <p >Doggie Care   {space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}<FaLock /></p>
      </div>
      <div style={{ paddingLeft: '8vh', paddingRight: '13vh', paddingTop: '4vh', paddingBottom: '4vh' }}>
        <Card style={{
          backgroundColor: '#062464',
        }}>
          <div style={{ paddingBottom: "8vh", paddingTop: "5vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
            <div style={{ paddingBottom: "5vh", paddingTop: "5vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
              <h1 style={{ color: 'white' }}>Appoinments</h1>
              <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                  <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                 
                  </div>

                </div>

              </div>



              
                  <Form  onSubmit={sendData}>
                    <Row>
                      <Col>
                        <br />
                        <div style={{ paddingLeft: '10vh' }}>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Name : </Form.Label>
                            <Form.Control type="text" value={name}
                              onChange={(e) => setName(e.target.value.replace(/\{/g, '!').replace(/\}/g, '!').replace(/\</g, '.').replace(/\=/g, ' '))}

                              placeholder=" Enter Name" style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Mobile Number: </Form.Label>
                            <Form.Control type="text" value={contact}
                              onChange={(e) => setContact(e.target.value)}

                              placeholder=" Enter Mobile Number" style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>NIC: </Form.Label>
                            <Form.Control type="text" value={nic}
                              onChange={(e) => setNIC(e.target.value)}

                              placeholder=" Enter NIC" style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Dog ID: </Form.Label>
                            <Form.Control type="text" value={dogid}
                              onChange={(e) => setdogid(e.target.value)}

                              placeholder=" Enter Dog ID" style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }} />
                          </Form.Group>



                        </div>

                        <br />
                      </Col>
                      <Col>
                        <br />
                        <div>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Fee: </Form.Label>
                            <Form.Control type="text" value={fee}
                              onChange={(e) => setfee(e.target.value)}

                              placeholder=" Enter Fee" style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Date: </Form.Label>

                            <Form.Control type="date" value={date}
                              onChange={(e) => setdate(e.target.value)}

                              placeholder='Select date' style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }} />

                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Time: </Form.Label>
                            <Form.Control value={time}
                              style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }}
                              type="time"
                              onChange={(e) => settime(e.target.value)}

                              placeholder='Select Time'
                            />

                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Reason: </Form.Label>
                            <Form.Control type="text" value={reason} as="textarea" rows={2}
                              onChange={(e) => setreason(e.target.value)}

                              placeholder=" Enter Reason" style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }} />
                          </Form.Group>


                        </div>

                        <br />
                      </Col>
                    </Row>
                    <div style={{ paddingLeft: "50%" }}>
                      <Button type="submit">Edit</Button>
                      {' '}<Button onClick = {()=>createPDF(_id,name,contact,nic,dogid,fee,date,time,reason)} >Download PDF</Button>

                    </div>

                  </Form>

          


            </div>
          </div>



        </Card>

      </div>
    </div>


  );

}
export default EditAppointment;



