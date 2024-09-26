import React, { useState } from 'react';
import axios from "axios";
//import { useNavigate } from 'react-router-dom';
import SupHeader from './Header'
import Swal from 'sweetalert2'

function AddCocoForm() {

  
  const [coAmount, setCocoCount] = useState("");
  const [coLocation, setCocoLocation] = useState("");


  function cocountFun(event) {
    setCocoCount(event.target.value);
    //  console.log(event.target.value);
  }

  function coLocationFun(event) {
    setCocoLocation(event.target.value);
    // console.log(event.target.value);
  }

  function sendData(event) {

    event.preventDefault();

    const newCocoSyp = {
      coAmount,
      coLocation
    }

    console.log(newCocoSyp); 

    axios.post("http://localhost:8889/supplier/supplyform", newCocoSyp, {
      headers: {
        'Authorization': "bearer "+localStorage.getItem('token')
      }
    }).then(() => {


      Swal.fire({
        icon: 'success',
        title: 'Thank you we will reach you soon....',
        
      }).then(()=>{
        window.location.href='/home';
      })


    }).catch((err) => {
      alert(err)
    })
  } 



  return (
    <div>
     <SupHeader/> 
  <div className='formwidth'>
  <div className='container'>
    <h1 className='hometext5'>To supply coconuts</h1>
    <form onSubmit={sendData}>
      <div class="form-group margins">
        <label for="coconutCount">Coconut Count</label>
        <input onChange={cocountFun} type="number" class="margins form-control" id="coconutCount" placeholder="Enter Coconut Count" />

      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input onChange={coLocationFun} type="text" class="margins form-control" id="location" placeholder="Enter Location" />
      </div>

      <button type="submit" class="btnWidth btn btn-primary btn-lg btn-block">Add  +</button>
    </form>

  </div>
  </div>
  </div>
  )


}




export default AddCocoForm;