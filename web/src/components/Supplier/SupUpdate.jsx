import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import { useNavigate } from 'react-router-dom';
import SupHeader from './Header'
import Swal from 'sweetalert2'

function SupUpdate(){
 // const navigate = useNavigate()

          const updateRowId = "";
         
          const {id} = useParams();

          console.log(id);
 
          const [amount, setCocoCount] = useState("");
          const [location, setCocoLocation] = useState("");

//-------------------------------------------------------
         
          // const [preAmount,setpreAmount] = useState("");
          // const [preLocation,setPreLocation] = useState("");

          useEffect(()=>{
                     function getCount(){
                      console.log("1st");

                             axios .get("http://localhost:8889/supplier/updateview/"+id, 
                              {
                                headers: {
                                  'Authorization': "bearer "+localStorage.getItem('token')
                                }
                              }).then((res)=>{
                                console.log("2nd");
                                       
                                       console.log(res);
                                       console.log(res.data.location);
                                       setCocoCount(res.data.amount);
                                       setCocoLocation(res.data.location);
                              }).catch((err)=>{
                                console.log(err);
                              })
                             
                    } getCount();
                    

          },[])
        
 //----------------------------------------------------------
        
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
              amount,
              location
            }
        
            console.log(newCocoSyp); 
        
            axios.patch("http://localhost:8889/supplier/supplyform/update/"+id, newCocoSyp, {
              headers: {
                'Authorization': "bearer "+localStorage.getItem('token')
              }
            }).then(() => {
             
              //navigate('/viewpending')
              Swal.fire({
                icon: 'success',
                title: 'Your entry Update successfully',
                
              }).then(()=>{
                window.location.href='/viewpending';
              })
              
            }).catch((err) => {
              alert(err)
            })
          } 
        

        
         


          


return( 
  <div>
     <SupHeader/> 
  
<div className='formwidth'>
<div className='container'>
  <h1>{id}</h1>
                               <h1 className='hometext5'>Update supply form</h1>
                    <form onSubmit={sendData}>
                    <div class="form-group margins">
                              <label for="coconutCount">Update Coconut Count</label>
                              <input onChange={cocountFun} value={amount} type="number" required class="margins form-control" id="coconutCount"  />

                    </div>
                    <div class="form-group">
                              <label for="location">Update Location</label>
                              <input onChange={coLocationFun} value={location} type="text" required class="margins form-control" id="location"  />
                    </div>

                               <button type="submit" class="btnWidth btn btn-primary btn-lg">Update</button>
                    </form>

                    </div>
                    </div>
                    </div>

)

}

export default SupUpdate;