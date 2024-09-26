import axios from "axios";
//import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import { useNavigate } from 'react-router-dom';
import SupHeader from './Header'
import Swal from 'sweetalert2'

function UpdateProfile(){
   // const navigate = useNavigate()

   const [username,setnUname] = useState("");
   const [nic,setnNic] = useState("");
   const [telephoneNum,setnPhone] = useState("");

   
  

    function getSupplierdata(){
        axios.get("http://localhost:8889/supplier/suplierprofile", 
        {
          headers: {
            'Authorization': "bearer "+localStorage.getItem('token')
          }
        }).then((res) => {
          console.log(res.data.telephoneNum)
          setnUname(res.data.username);
          setnNic(res.data.nic);
          setnPhone(res.data.telephoneNum);

          

                          
                          
    
    
                        }).catch((err) => {
                          alert(err)
                        })
      }

    useEffect(()=>{
        getSupplierdata();
     },[]);


 function submitdata(){
      const newData ={
        username,
        nic,
        telephoneNum
      }
      console.log(newData);

      axios.patch("http://localhost:8889/supplier/suplierprofile/profileupdate", newData , 
      {
        headers: {
          'Authorization': "bearer "+localStorage.getItem('token')
        }
      }
       ).then((res)=>{

        Swal.fire({
          icon: 'success',
          title: res.data,
          
        }).then(()=>{
          window.location.href='/supplierprofile';
        })
       
          
                  

        
        
        
        
      }).catch((err)=>{
        alert(err);
      })





 }

    return(
    <div>
       <SupHeader/> 
        
        <h1>Yako me Update form eka enna ona eka</h1>

        <form>
      <div class="form-group row">
     <label for="inputEmail3" class="col-sm-2 col-form-label">User Name</label>
       <div class="col-sm-10">
      <input type="text" onChange={e=>setnUname(e.target.value)} value={username} class="form-control" id="inputEmail3" />
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">NIC Number</label>
    <div class="col-sm-10">
      <input type="Number" onChange={e=>setnNic(e.target.value)} value={nic} class="form-control" id="inputPassword3"/>
    </div>
  </div>

  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Telephone Number</label>
    <div class="col-sm-10">
      <input type="Number" onChange={e=>setnPhone(e.target.value)} value={telephoneNum} class="form-control" id="inputPassword3" />
    </div>
  </div>

  <br/>
</form>

<button onClick={submitdata}>Update Profile</button>


    </div>)

}
export default UpdateProfile;