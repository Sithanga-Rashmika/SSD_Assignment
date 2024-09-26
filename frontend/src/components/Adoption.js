import React, { useState , useEffect, Fragment } from "react"
import { FaLock } from "react-icons/fa";
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function DogRegistration() {
  const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
  const [dogName, setDogName] = useState(" ");
  const [perspectivePetParents, setPerspectivePetParents] = useState(" ");
  const [contactNo, setContactNo] = useState(" ");
  const [buildingNo, setBuildingNo] = useState(" ");
  const [street, setStreet] = useState(" ");
  const [city, setCity] = useState(" ");
  const [adoptDate, setAdoptDate]= useState(" ");
  const [adoption, setadoption] = useState([]);
  let params = useParams();

  useEffect(() => {


    //get funtion
    function getadoption() {     

      axios.get(`http://localhost:8000/createRescuedDog/get/${params.id}`).then((res) => {

        setadoption(res.data);
       
        setDogName(res.data.dog.dogName);
        setPerspectivePetParents(res.data.dog.perspectivePetParents);
        setContactNo(res.data.dog.contactNo);
        setBuildingNo(res.data.dog.buildingNo);
        setStreet(res.data.dog.street);
        setAdoptDate(res.data.dog.adoptDate);
        console.log(res.data.dog.dogName);
        console.log(res.data);

      }).catch((err) => {
        alert(err.message);
      })
    }
    getadoption();
  }, [])




  //update function
  function sendData(e) {

    e.preventDefault();

    const newAdoption= {
      
    
      dogName,
      perspectivePetParents,
      contactNo,
      buildingNo,
      street,
      //city,
      adoptDate
    }

    axios.put(`http://localhost:8000/createRescuedDog/updateAdoptDog/${params.id}`, newAdoption).then(() => {
      alert("Puppies Updated");
      window.location = '/viewstrayPuppies';

      setDogName('');
      setPerspectivePetParents('');
      setContactNo('');
      setBuildingNo('');
      setStreet('');
      setAdoptDate('');
     

    }).catch((err) => {
      alert("error");
    })
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
                  <h6 style={{ color: '#A4DE02' }}>Adopt A Puppy</h6>

                </div><br></br>

                <Form onSubmit={sendData}>
                  <Row>
                    <Col>
                      <br />
                      <div style={{ paddingLeft: '10vh' }}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}><b>Dog Name*: </b></Form.Label>
                          <Form.Control type="text" value = {dogName}
                            onChange={(e) => setDogName(e.target.value)}
                            placeholder=" Enter Parents Name"
                            style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}><b>Perspective PetParents*: </b></Form.Label>
                          <Form.Control type="text" value = {perspectivePetParents} 
                            onChange={(e) => setPerspectivePetParents(e.target.value)}

                            placeholder=" Enter Parents Name" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}><b>Home/BuildingNo*: </b> </Form.Label>
                          <Form.Control type="text"  value = {buildingNo} 
                            onChange={(e) => setBuildingNo(e.target.value)}

                            placeholder="9/A" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}><b>City*: </b></Form.Label>
                          <Form.Control type="text"  value = {city} 
                            onChange={(e) => setCity(e.target.value)}

                            placeholder="Colombo" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}required />
                        </Form.Group>

                      </div>

                      <br />
                    </Col>
                    <Col>
                      <br />
                      <div>
                    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}><b>Contact Number*:</b> </Form.Label>
                          <Form.Control type="text"   value = {contactNo}
                            onChange={(e) => setContactNo(e.target.value)}

                            placeholder=" Enter Contact Number" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}required />
                        </Form.Group>
                        

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}><b>Street*: </b></Form.Label>
                          <Form.Control type="text" value={street}
                            onChange={(e) => setStreet(e.target.value)}

                            placeholder=" Flower Road" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}required />
                        </Form.Group>
                      
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}><b>Date*: </b></Form.Label>
                          <Form.Control type="date" value={adoptDate}
                            onChange={(e) => setAdoptDate(e.target.value)}

                            placeholder=" Enter Date" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}required />
                        </Form.Group>
                        
                      </div>

                      <br />
                    </Col>
                  </Row>
                  <div style={{ paddingLeft: "45%" }}>
                    <Button type="submit" size="lg" >Adopt Puppy</Button>
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
