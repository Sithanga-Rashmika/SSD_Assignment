import React, { useState, Fragment } from "react"
import { FaLock } from "react-icons/fa";
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";

export default function Login() {
    const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>




    return (
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
                    <div style={{ paddingLeft: '28vh', paddingRight: '23vh', paddingTop: '4vh', paddingBottom: '4vh' }}>
                        <Card style={{
                            backgroundColor: '#010020',
                        }}>
                            <Card.Body>
                                <div style={{ paddingLeft: '4vh' }}>
                                    <h6 style={{ color: '#A4DE02' }}>Login</h6>

                                </div>

                                <Form >

                                    <div style={{ paddingLeft: '5vh' }}>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" style={{
                                                backgroundColor: '#010020',
                                                color: '#F62681'
                                            }} />
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter password" style={{
                                                backgroundColor: '#010020',
                                                color: '#F62681'
                                            }} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ color: 'white' }}>Type</Form.Label>
                                            <Form.Select aria-label="Default select example" style={{
                                                backgroundColor: '#010020',
                                                color: '#F62681'
                                            }}>
                                                <option>Select Type</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                            
                                        </Form.Group>

                                    </div>

                                    <br />



                                    <div style={{ paddingLeft: "65vh" }}>
                                        <Button type="submit">Login</Button>
                                    </div>
                                </Form>

                            </Card.Body>
                        </Card>
                    </div>
                </Card>
            </div>


        </div>
    );
}
