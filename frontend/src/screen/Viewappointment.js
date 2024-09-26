import React, { useState, useEffect, Fragment } from "react";
import { Table, Button,Card } from "react-bootstrap";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt,FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Viewappointment(props) {
    const [appointment, setappointment] = useState([]);
    const [search, setSearch] = useState("");
    const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
    const navigate = useNavigate();

    const addappointment = ()=>{
        navigate('/addappointment')
      }
    useEffect(() => {
        //get funtion
        function getappointment() {
            axios.get("http://localhost:8000/appointment/").then((res) => {
                setappointment(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getappointment();
    },[])

    //delete funtion
    function onDelete(_id){
        console.log(_id);
        axios.delete("http://localhost:8000/appointment/"+_id).then((res) =>{
           alert('Deleted Successfully'); 
           window.location.reload();
       }).catch((err) => {
           alert(err.message);
       })
      }

    
      function update(_id){
        console.log(_id)
        window.location = "/editappointment/"+_id
      }


    return (
        <div style={{
            backgroundColor: '#010020',
            width: '100% ',
            height: '1000px'
          }}>
            <div style={{ paddingLeft: "10vh", color: 'white',paddingTop:'4vh' }}>
        <p >Doggie Care   {space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}<FaLock /></p>
      </div>
            <div style={{ paddingLeft: '8vh', paddingRight: '13vh', paddingTop: '4vh', paddingBottom: '4vh' }}>
                <Card style={{
                    backgroundColor: '#062464',
                }}>
<div style={{ paddingBottom: "8vh", paddingTop: "5vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
            <div style={{ paddingBottom: "5vh", paddingTop: "5vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
                <h1 style={{color:'white'}}>Appoinments</h1>
                <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                            <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                <input type="text" placeholder="Search from 'Name' " className="mr-2"
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }} />
                            </div>
                        </div>
                        {space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}
                        <Button onClick={addappointment}> ADD APPOINTMENTS</Button>
                </div>
                <Table striped bordered hover size="sm" variant="light" >
                    <thead>
                        
                        <tr>

                            <th>Name</th>
                            <th>Contact</th>
                            <th>NIC</th>
                            <th>DogID</th>
                            <th>Fee</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Reason</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {appointment.filter(Appointment => {
                            if (search === "") {
                                return Appointment
                            }
                            else if (Appointment.name.toLowerCase().includes(search.toLowerCase())) {
                                return Appointment
                            }
                        }).
                            map((Appointment) => {

                                // Replace '!' with '{}'
                                const reasonWithCurlyBraces = Appointment.reason.replace(/!/g, '{');

                                return (
                                    <tr key={Appointment._id}>
                                        <td>{Appointment.name}</td>
                                        <td>{Appointment.contact}</td>
                                        <td>{Appointment.nic}</td>
                                        <td>{Appointment.dogid}</td>
                                        <td>{Appointment.fee}</td>
                                        <td>{Appointment.date}</td>
                                        <td>{Appointment.time}</td>
                                        <td>{reasonWithCurlyBraces}</td> {/* Display reason with curly braces */}
                                        <td>
                                            <Button variant="outline-success" onClick={() => update(Appointment._id)} ><FaPencilAlt/></Button>
                                        </td>

                                        <td>
                                            <Button variant="outline-danger" onClick={() => onDelete(Appointment._id)}><FaTrashAlt/></Button>

                                        </td>
                                    </tr>

                                );
                            })}

                    </tbody>

                </Table >

            </div>
        </div>



                </Card>

            </div>
        </div>


    );

}
export default Viewappointment;



