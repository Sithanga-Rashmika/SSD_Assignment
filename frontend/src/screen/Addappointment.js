import React, { useState, Fragment } from "react"
import { FaLock } from "react-icons/fa";
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
;

export default function Addappointment() {
  const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
  const [name, setName] = useState(" ");
  const [contact, setContact] = useState(" ");
  const [nic, setNIC] = useState(" ");
  const [dogid, setdogid] = useState(" ");
  const [fee, setfee] = useState(" ");
  const [date, setdate] = useState(" ");
  const [time, settime] = useState(" ");
  const [reason, setreason] = useState(" ");

  function sendData(e) {

    e.preventDefault();

    const newAppointment = {
      name,
      contact,
      nic, dogid, fee, date, time, reason
    }

    axios.post("http://localhost:8000/appointment/", newAppointment).then(() => {
      ("Appointment added")
      setName('');
      setContact('');
      setNIC('');
      setdogid('');
      setfee('');
      setdate('');
      settime('');
      setreason('');
      alert("Appointment added added");
      window.location = `/viewappointment`;

    }).catch((err) => {
      alert("error");
    })
  }
  // const [startDate, setStartDate] = useState(new Date());

  return (
    <div style={{
      backgroundColor: '#010020',
      width: '100% ',
      height: '1000px'
    }}>
      <div style={{ paddingLeft: "10vh", color: 'white', paddingTop: '4vh' }}>
        <p >Doggie Care   {space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}<FaLock /></p>
      </div>

      <div style={{ paddingLeft: '7vh', paddingRight: '7vh', paddingTop: '3vh', paddingBottom: '3vh' }}>
        <Card style={{
          backgroundColor: '#062464',
        }}>
          <div style={{ paddingLeft: '8vh', paddingRight: '9vh', paddingTop: '4vh', paddingBottom: '4vh' }}>
            <Card style={{
              backgroundColor: '#010020',
            }}>
              <Card.Body>
                <div style={{ paddingLeft: '1vh' }}>
                  <h6 style={{ color: '#A4DE02' }}>Add Appointments</h6>

                </div>

                <Form onSubmit={sendData}>
                  <Row>
                    <Col>
                      <br />
                      <div style={{ paddingLeft: '10vh' }}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Name : </Form.Label>
                          <Form.Control type="text"
                            onChange={(e) => setName(e.target.value)}

                            placeholder=" Enter Name" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Mobile Number: </Form.Label>
                          <Form.Control type="text"
                            onChange={(e) => setContact(e.target.value)}
                            maxLength={10}
                            placeholder=" Enter Mobile Number" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>NIC: </Form.Label>
                          <Form.Control type="text"
                            onChange={(e) => setNIC(e.target.value)}
                            maxLength={15}
                            placeholder=" Enter NIC" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Dog ID: </Form.Label>
                          <Form.Control type="text"
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
                          <Form.Control type="number"
                            onChange={(e) => setfee(e.target.value)}

                            placeholder=" Enter Fee" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Date: </Form.Label>
                          
                         <Form.Control type="date"
                            onChange={(e) => setdate(e.target.value)}

                            placeholder='Select date' style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }} required/>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Time: </Form.Label>
                          <Form.Control
                           style={{
                            backgroundColor: '#010020',
                            color: '#F62681'
                          }}
                          type="time"
                            onChange={(e) => settime(e.target.value)}

                            placeholder='Select Time'
                            required/>
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Reason: </Form.Label>
                          <Form.Control type="text" as="textarea" rows={2}
                            onChange={(e) => setreason(e.target.value.replace(/[<>{}=]/g, (match) => {
                              // Replace each match with the corresponding replacement character
                              const replacements = {
                                '<': ',',
                                '>': '.',
                                '{': ';',
                                '}': "'",
                                '=': '!',
                              };
                              return replacements[match];
                            })
                        )}

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
                    <Button type="submit">ADD</Button>
                  </div>
                </Form>

              </Card.Body>
            </Card>
          </div>
        </Card>
      </div>


    </div>
  );
}
