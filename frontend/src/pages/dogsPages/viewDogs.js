import React, { useState, useEffect, Fragment } from "react";
import { Table, Button, Card } from "react-bootstrap";
import axios from "axios";
import { FaTrashAlt, FaLock, FaHeartbeat } from "react-icons/fa";
import { Link } from 'react-router-dom'

function ViewAll() {
    const [dog, setDog] = useState([]);
    const [search, setSearch] = useState("");
    const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>

    useEffect(() => {

        //get funtion
        function getDog() {
            axios.get("http://localhost:8000/dog/").then((res) => {
                setDog(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getDog();
    }, [])

    //delete funtion
    async function deleteDog(id) {
        await axios.delete(`http://localhost:8000/dog/delete/${id}`).then(() => {
            alert("Dog deleted successfully");
            window.location = `/viewDogs`;


        }).catch((error) => {
            alert(`Failed to delete \n${error.message}`)
        })
    }

    return (
        <div style={{
            backgroundColor: '#010020',
            width: '100% ',
            height: '1000px'
        }}>
            <div style={{ paddingLeft: "10vh", color: 'white', paddingTop: '4vh' }}>
                <p >Doggie Care   {space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}<FaLock /></p>
            </div>
            <div style={{ paddingLeft: '8vh', paddingRight: '13vh', paddingTop: '4vh', paddingBottom: '4vh' }}>
                <Card style={{
                    backgroundColor: '#062464',
                }}>
                    <div style={{ paddingBottom: "8vh", paddingTop: "5vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
                        <div style={{ paddingBottom: "5vh", paddingTop: "5vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
                            <h1 style={{ color: 'white' }}>Dogs List</h1>
                            <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                                    <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                        <input type="text" placeholder="Search from 'dog ID' " className="mr-2"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }} />
                                    </div>
                                    {space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}
                                    <Link to='/addDog'>
                                        <Button style={{ backgroundColor: "blue" }}>ADD DOGS</Button>
                                    </Link>
                                    &nbsp;
                                    <Link to='/prescriptions'>
                                        <Button style={{ backgroundColor: "#FF003D" }}>VIEW PRESCRIPTIONS</Button>
                                    </Link>
                                </div>

                            </div>
                            <Table striped bordered hover size="sm" variant="light" >
                                <thead>

                                    <tr>

                                        <th>Dog ID</th>
                                        <th>Dog Name</th>
                                        <th>Owner Name</th>
                                        <th>Date of Birth</th>
                                        <th>Breed</th>
                                        <th>Sex</th>
                                        <th>Address</th>
                                        <th>Prescriptions</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {dog.filter(Dog => {
                                        if (search === "") {
                                            return Dog
                                        }
                                        else if (Dog.dogID?.toLowerCase().includes(search.toLowerCase())) {
                                            return Dog
                                        }
                                    }).
                                        map((Dog) => {

                                            // Replace '!' with '{}'
                                            const reasonWithCurlyBraces = Dog.address.replace(/!/g, '{');
                                            return (
                                                <tr key={Dog._id}>
                                                    <td>{Dog.dogID}</td>
                                                    <td>{Dog.dogName}</td>
                                                    <td>{Dog.ownerName}</td>
                                                    <td>{Dog.dob}</td>
                                                    <td>{Dog.breed}</td>
                                                    <td>{Dog.sex}</td>
                                                    <td>{reasonWithCurlyBraces}</td> {/* Display reason with curly braces */}
                                                    <td><center>
                                                        <Link
                                                            to={`/addHealth/${Dog._id}`}
                                                            className="btn btn-sm expenseButton"
                                                        > <FaHeartbeat />
                                                        </Link> </center>
                                                    </td>

                                                    <td>
                                                        <Button variant="outline-danger" onClick={() => { if (window.confirm('Are you sure you want to delete this record?')) deleteDog(Dog._id) }}><FaTrashAlt /></Button>

                                                    </td>

                                                </tr>

                                            );
                                        })}

                                </tbody>

                            </Table >
                            <li className="nav-item" style={{ color: 'white' }}>
                            </li>
                        </div>
                    </div>



                </Card>

            </div>
        </div>


    );

}
export default ViewAll;



