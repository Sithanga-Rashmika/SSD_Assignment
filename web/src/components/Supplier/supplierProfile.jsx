
import React,{useState,useEffect} from "react";
import axios from "axios";

import Swal from 'sweetalert2'
//import { useNavigate } from 'react-router-dom';
import SupHeader from './Header'

function ProfileView(){

  //const navigate = useNavigate();
  
  // const [SupName,setSupName] = useState("");
  // const [supNic, setSupNic] = useState("");
  // const [supTp, setSupTp] = useState("");
  const [detail, setDetail] = useState([]);

  

  function getSupplierdata(){
    axios.get("http://localhost:8889/supplier/suplierprofile", 
    {
      headers: {
        'Authorization': "bearer "+localStorage.getItem('token')
      }
    }).then((res) => {
                     
                    //  setSupName(res.data.username);
                    //  setSupNic(res.data.nic);
                    //  setSupTp(res.data.telephoneNum);

                    //   console.log(res.data.username);
                    //   console.log(res.data.nic);
                    //   console.log(res.data.telephoneNum);

                    setDetail(res.data);
                      
                      


                    }).catch((err) => {
                      alert(err)
                    })
  }
  
  useEffect(()=>{
    getSupplierdata();
   

},[]);



function proUpdate(){
  //navigate ('/supplierprofile/update/'+id);
  
 

  Swal.fire({
    title: 'Are you need to update your profile?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#008000',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href='/supplierprofileupdate';

    }
  })
}

function changePass(){
  

  Swal.fire({
    title: 'Are you need to change your password?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#008000',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href='/supChangepass';

    }
  })



}

function deleteProfile(){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete my account!'
  }).then((result) => {
    if (result.isConfirmed) {

          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {

                
              axios.delete("http://localhost:8889/supplier/profile/delete",{
                headers: {
                  'Authorization': "bearer "+localStorage.getItem('token')
                }
              }).then(function(res){
                console.log(" errrrrrrrrrr    "+res)
                
                  Swal.fire(
                    'Deleted!',
                    'Your account has been deleted.',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                      
                      window.location.href='/suppliersignupandlogin';
    
                    }
                  })



                
              }).catch(function(err){
                alert(err);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                 
              })
          }

          )
            }
          })
   

    }
  })

}




    return(
        <div>
           <SupHeader/> 
          {detail._id}
            <form>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">User Name</label>
    <div class="col-sm-10">
      <input type="text" value={detail.username} class="form-control" disabled id="inputEmail3" placeholder="User Name"/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">NIC Number</label>
    <div class="col-sm-10">
      <input type="text" value={detail.nic} class="form-control" disabled id="inputPassword3" placeholder="NIC Number"/>
    </div>
  </div>

  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Telephone Number</label>
    <div class="col-sm-10">
      <input type="Number" value={detail.telephoneNum} disabled class="form-control" id="inputPassword3" placeholder="Telephone Number"/>
    </div>
  </div>

  <br/>
</form>
  
  <div class="form-group row">
    <div class="m-auto col-sm-10">

    <button onClick={proUpdate} class="m-2 btn btn-primary">Edit Profile</button>
    <button  onClick={changePass} class="m-2 btn btn-primary">Change Password</button>
    <button  onClick={deleteProfile} class="m-2 btn btn-primary">Delete Profile</button>
   
    </div>
   
  </div>

        </div>
    )


}
export default ProfileView;