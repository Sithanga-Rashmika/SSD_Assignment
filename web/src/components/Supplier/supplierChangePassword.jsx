import React, { useState } from "react";
import axios from "axios";
import SupHeader from './Header'
import Swal from 'sweetalert2'

function SupChangepass(){

    const [getoldpass,setoldpass]= useState("");
    const [getnewpass,setnewpass]= useState("");
    const [getrenewpass,setrenewpass]= useState("");

    function oldpass(e){
        console.log(e.target.value)
        setoldpass(e.target.value)
    }
    function newpass(e){
        console.log(e.target.value)
        setnewpass(e.target.value)
    }
    function renewpass(e){
        console.log(e.target.value)
        setrenewpass(e.target.value)
    }
    function subbtn(){
       

        if(getnewpass == getrenewpass){

          var changepass = {
                getoldpass,
                getrenewpass
            }

            console.log(changepass);

            axios.patch("http://localhost:8889/supplier/supplymanager/profile/changepass",changepass,{
                headers: {
                  'Authorization': "bearer "+localStorage.getItem('token')
                }
              }).then((err) => {
                
              if(err.data.type == "correct"){
        
                  Swal.fire({
                    icon: 'success',
                    title: 'Your password was successfully updated',
                    text: 'Please log in again. Thank you!',
                   
                  }).then(()=>{
                    window.location.href='/suppliersignupandlogin';
                  })



                }else if(err.data.type == "wrong"){

                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Your old password incorrect',
                    showConfirmButton: false,
                    timer: 1500
                  })

                  
                }

               
                
              }).catch((err) => {
                alert(err)
              })






           

            
        }else{

          Swal.fire({
            position: 'center',
            icon: 'question',
            title: 'Your newly entered passwords are not matching',
            showConfirmButton: false,
            timer: 1500
          })

        }




    }

    return(
        <div>
          <SupHeader/> 
            
        
                <input type="text" onChange={oldpass} placeholder="Enter your old password" /><br />
                <input type="text" onChange={newpass} placeholder="Enter your new password" /><br />
                <input type="text" onChange={renewpass} placeholder="Re-Enter your new password" /><br />
                <button onClick={subbtn}> Submit</button>
            

        </div>
    )


}

export default SupChangepass;