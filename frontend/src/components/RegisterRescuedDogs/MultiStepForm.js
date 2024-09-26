import React, { Component } from 'react';
import  RescureDetails from "./RescureDetails";
import DogDetails from "./DogDetails";
import Confirmation from "./Confirmation";
import axios from "axios";

class MultiStepForm extends Component {
    constructor(props){
        super(props);
    this.state = {
        step: 1,
        rescuerName: '',
        rescuerContactNo: '',
        registerdDate: '',
        description: '',
        dogName: '',
        dogColour: '',
        weight: '',
        age: '',
        gender: '',
        errors:{}
        
    };
    }
    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit=(e)=>{
        e.preventDefault();
        
        const{name,email,route,date,Time,from,to,seatno}=this.state;
      
        if(this.validate(name,email,route,date,Time,from,to,seatno)){
          const data={
        rescuerName: '',
        rescuerContactNo: '',
        registerdDate: '',
        description: '',
        dogName: '',
        dogColour: '',
        weight: '',
        age: '',
        gender: '',
        
        }
      console.log(data)
      
      axios.post("/post/save",data).then((res)=>{
        alert("Seat Reserved Sucessfully");
        window.location=`/addpayment`;
        if(res.data.sucess){
          this.setState(
            {
            name :"",
            email : "",
            route: "",
            date : "",
            Time : "",
            from : "",
            to :"",
            seatno :""
      
            }
          )
        }
      })
      
      }
      
        }
        







    render(){
        const { step, rescuerName,rescuerContactNo,registerdDate,description,dogName,dogColour,weight,age,gender} = this.state;
        const inputValues = { rescuerName,rescuerContactNo,registerdDate,description,dogName,dogColour,weight,age,gender };
        switch(step) {
            case 1:
                return <RescureDetails
                        nextStep={this.nextStep}
                        handleChange = {this.handleChange}
                        inputValues={inputValues}
                        />
            case 2:
                return <DogDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        inputValues={inputValues}
                        />
            case 3:
                return <Confirmation
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputValues={inputValues}
                        />
            }
        }


    }


export default MultiStepForm;