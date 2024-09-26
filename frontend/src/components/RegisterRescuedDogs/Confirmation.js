import React, { Component , useState, Fragment }from 'react';
import { FaLock } from "react-icons/fa";
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
class Confirmation extends Component{
  
   
    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
       
    };

    render(){
        const {inputValues: { rescuerName,rescuerContactNo,registerdDate,description,dogName,dogColour,weight,age,gender  }} = this.props;
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
              backgroundColor: 'White',
            }}>
              <Card.Body>
                <div style={{ paddingLeft: '1vh' }}>
                  <h6 style={{ color: '#A4DE02' }}>Register Stray Puppy</h6>

                </div>

          
                <center><b><h1>Confirm your Details</h1></b></center>
                <p>Confirm if the following details are correct.</p><br></br>
                <Form>
                <b>

            
                <p>Rescuer Name: {rescuerName}</p>
                <p>Rescuer Contact Number: {rescuerContactNo}</p>
                <p>Registerd Date: {registerdDate}</p>
                <p>Description: {description}</p>
                <p>Dog Name: {dogName}</p>
                <p>Dog Colour: {dogColour}</p>
                <p>Weight: {weight}</p>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
                </b>
                <div style={{ paddingLeft: "45%" }}>
                  
                
                <Button variant="secondary" class="btn btn-primary btn-lg btn-block" onClick={this.back}>Back</Button>{' '}{' '}
                <Button variant="primary" type="submit" class="btn btn-primary btn-lg btn-block" onClick={this.saveAndContinue}>Confirm Register Stray Puppy</Button>
                </div>
          
                </Form>
            </Card.Body>
            </Card>
          </div>
        </Card>
      </div>


    </div>
             
        )
    }
}

export default Confirmation;