import React, { Component, Fragment } from 'react';
import { Form, Button,Card } from 'react-bootstrap';
import { FaLock } from "react-icons/fa";
class DogDetails extends Component{
   
    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };


    render() {
        const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
        return(
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
                  <h6 style={{ color: '#A4DE02' }}>Register Stray Puppy</h6>

                </div>

                <Form>
                      <br />
                      <div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Dog Name*: </Form.Label>
                          <Form.Control 
                          type="text"
                          defaultValue={this.props.inputValues.dogName}
                          name="dogName"
                          onChange={this.props.handleChange}

                            placeholder=" Enter Dog Name" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Dog Colour: </Form.Label>
                          <Form.Control 
                          type="text"
                          defaultValue={this.props.inputValues.dogColour}
                          name="dogColour"
                               
                          onChange={this.props.handleChange}

                            placeholder=" Enter Dog Colour" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }} />
                        </Form.Group>
                        

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Weight: </Form.Label>
                          <Form.Control type="Number"
                         defaultValue={this.props.inputValues.weight}
                         name="weight"
                         onChange={this.props.handleChange}

                            placeholder=" Enter Weight" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }} />
                        </Form.Group>
                        

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ color: 'white' }}>Age</Form.Label>
                                            <Form.Select aria-label="Default select example"
                                               defaultValue={this.props.inputValues.age}
                                               name="age"
                                               required
                                               onChange={this.props.handleChange}

                                                style={{

                                                    backgroundColor: '#010020',
                                                    color: '#F62681'

                                                }}>
                                                <option>Select the Age Range</option>
                                                <option value="below 1 year">below 1 year</option>
                                                <option value="1-5 years">1-5 years</option>
                                                <option value="Above 5 years">Above 5 years</option>
                                            </Form.Select>

                          </Form.Group>



                        


                        <Form.Group className="mb-3" controlId="formBasicGender">
                          <Form.Label style={{ color: 'white' }}>Gender: </Form.Label>
                             <Form.Select as="gender" name="gender" 
                             defaultValue={this.props.inputValues.gender} 
                             onChange={this.props.handleChange}
                              style={{
                                backgroundColor: '#010020',
                                color: '#F62681'
                              }}>
                            
                            <option>Select Gender</option>
                             <option value="Male">Male</option>
                            <option value="Female">Female</option>


                           </Form.Select>       
                         
                        </Form.Group>
                        
                      </div>

                      <br />
                   
                  <div style={{ paddingLeft: "45%" }}>
                  <Button class="btn btn-primary btn-lg btn-block" onClick={this.back}>Back</Button>{' '}
                  <Button class="btn btn-primary btn-lg " onClick={this.saveAndContinue}>Next</Button>
                  
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
}

export default DogDetails;