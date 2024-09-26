import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaCreativeCommonsNd } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

// import { GoogleOAuthProvider, GoogleLogin,googleLogout} from '@react-oauth/google';

function SideBar() {
  const navigate = useNavigate();
  

  const logout = () => {
    if (localStorage.getItem("authToken") && localStorage.getItem("userRole")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("authRes");
      navigate('/susersignin')
      // googleLogout();
    }
  };
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const home = ()=>{
    navigate("/")
  }

  const medicine = ()=>{
    navigate("/medicines")
  }

  const appointments = ()=>{
    navigate("/viewappointment")
  }

  const dogs = ()=>{
    navigate("/viewDogs")
  }

  const strayDogs = ()=>{
    navigate("/viewstrayPuppies")
  }

  const signin = ()=>{
    navigate("/susersignin")
  }

  const signup = ()=>{
    navigate("/susersignup")
  }


  return (
    <>
    
      <Button variant="secondary" onClick={handleShow}>
      <FaCreativeCommonsNd/>
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Doggie Care</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
       
        <div className="d-grid gap-2">

        <Button variant="secondary" size="lg" onClick={home}>
      HOME
    </Button>

      <Button variant="primary" size="lg" onClick={appointments}>
      APPOINTMENTS
    </Button>
      <Button variant="secondary" size="lg" onClick={dogs}>
        DOGS LIST
      </Button>
    </div>
    <br />
    <div className="d-grid gap-2">
      <Button variant="primary" size="lg" onClick={medicine}>
        MEDICINE STORE
      </Button>
      <Button variant="secondary" size="lg" onClick={strayDogs}>
        STRAY PUPPIES
      </Button>
      <br /><br /><br /><br />
      
      {!localStorage.getItem("authToken") && (
                  <Button
                    href="/susersignup"
                    sx={{ marginLeft: "10%" }}
                    variant="secondary"
                  >
                    Signup
                  </Button>
                )}

      {!localStorage.getItem("authToken") && (
                  <Button
                    href="/susersignin"
                    sx={{ marginLeft: "2%" }}
                    variant="secondary"
                  >
                    Sign-in
                  </Button>
                )}
      {localStorage.getItem("authToken") && (
                  <Button
                    style={{ marginRight: "2%" }}
                    onClick={() => {
                      logout();
                    }}
                  >Sign Out</Button>
                )}

{/* {localStorage.getItem("authRes") && (
                  <Button
                    style={{ marginRight: "2%" }}
                    onClick={() => {
                      logout();
                    }}
                  >GG Out</Button>
                )} */}

                
                
    </div>
    
    <br/><br/><br/><br/>

   
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;