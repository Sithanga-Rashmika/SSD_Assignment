import React, { useState, Fragment } from "react"
import { FaLock } from "react-icons/fa";
import { Card, Image,Button, Container,Row, Col, Form } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import axios from "axios";
import SideBar from "./SideBar";

export default function Home() {
    const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>




    return (
        
        <div style={{
            backgroundColor: '#010020',
            width: '100% ',
            height: '1000px'
        }}>
            <div style={{ paddingLeft: "10vh", color: 'white', paddingTop: '4vh' }}>
                <p style={{fontSize: "1.2rem"}}><b>DOGGIE CARE</b>  {space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}{space2}<FaLock /></p>
            </div>
            <center>
            <img src=  "https://i.pinimg.com/originals/9f/df/93/9fdf93860f9269c05411e27291a7b936.gif" alt="gif" style={{height: "70vh", width: "50vw"}}/>
            </center>

                            
        </div>
    );
}
