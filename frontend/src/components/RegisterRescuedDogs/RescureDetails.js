import React, { Component, Fragment } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { FaLock } from "react-icons/fa";

class RescureDetails extends Component{

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
                      <div style={{ paddingLeft: '10vh' }}>

                        <Form.Group className="mb-3" controlId="formRescuerName">
                          <Form.Label style={{ color: 'white' }}>Rescuer Name: </Form.Label>
                          <Form.Control 
                              type="text"
                              defaultValue={this.props.inputValues.rescuerName}
                              name="rescuerName"
                              onChange={this.props.handleChange}
                
                              placeholder=" Enter Rescuer Name" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Rescuer's Contact No*: </Form.Label>
                          <Form.Control 
                            type="text"
                            defaultValue={this.props.inputValues.rescuerContactNo}
                            name="rescuerContactNo"
                            onChange={this.props.handleChange}

                            placeholder=" Enter Rescuer''s Contact No" style={{
                            backgroundColor: '#010020',
                            color: '#F62681'
                            }}required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Registerd Date*: </Form.Label>
                          <Form.Control
                            type="date"
                            defaultValue={this.props.inputValues.registerdDate}
                            name="registerdDate"
                            onChange={this.props.handleChange}
                           

                            placeholder=" Enter Registerd Date" style={{
                              backgroundColor: '#010020',
                              color: '#F62681'
                            }}required />
                        </Form.Group>

                        
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label style={{ color: 'white' }}>Description: </Form.Label>
                          <Form.Control type="text" as="textarea" rows={2}
                          defaultValue={this.props.inputValues.description}
                          name="description"
                          onChange={this.props.handleChange}
                       

                         placeholder=" Enter Reason" style={{
                            backgroundColor: '#010020',
                            color: '#F62681'
                            }} />
                        </Form.Group>
                       
   
                      </div>

                      <br />
                      <div style={{ paddingLeft: "45%" }}>
                    
                    <Button type="submit" class="btn btn-primary btn-lg btn-block"  onClick={this.saveAndContinue}>Next</Button>
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

export default RescureDetails;