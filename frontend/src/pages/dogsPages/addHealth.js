import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { FaLock } from "react-icons/fa";
import { Card } from 'react-bootstrap';

function AddHealthDetails() {
  const space2 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
  const [weight, setWeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [disease, setDisease] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [medicine, setMedicine] = useState("");
  const [labTests, setLabTests] = useState("");
  const [doctor, setDoctor] = useState("");

  //retrieve relevent data form relavent fields

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8000/dog/${id}`)
      .then((res) => {
        setWeight(res.data.dog.weight);
        setBloodGroup(res.data.dog.bloodGroup);
        setDisease(res.data.dog.disease);
        setLastDate(res.data.dog.lastDate);
        setNextDate(res.data.dog.nextDate);
        setMedicine(res.data.dog.medicine);
        setLabTests(res.data.dog.labTests);
        setDoctor(res.data.dog.doctor);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //update data 
  function sendUpdateDetails(e) {
    e.preventDefault();//prevent submit event default behaviour
    const updateDetails = {
     
      weight,
      bloodGroup,
      disease,
      lastDate,
      nextDate,
      medicine,
      labTests,
      doctor
    }

    axios.put(`http://localhost:8000/dog/update/${id}`, updateDetails).then(() => {
      alert("Updated sucessfully");
      window.location = `/viewDogs`;

    }).catch((err) => {
      alert(err);
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

      <div style={{ paddingLeft: '7vh', paddingRight: '7vh', paddingTop: '3vh', paddingBottom: '3vh' }}>
        <Card style={{
          backgroundColor: '#062464',
        }}>
          <div style={{ paddingLeft: '8vh', paddingRight: '9vh', paddingTop: '4vh', paddingBottom: '4vh' }}>
            <Card style={{
              backgroundColor: '#010020',
            }}>
              <Card.Body>
                <div style={{ paddingLeft: '1vh' }}>
                  <h6 style={{ color: '#A4DE02' }}>Add Health Related Information</h6>

                </div>

      <div className="container col-6" onSubmit={sendUpdateDetails}>
        <form className="addMarks">
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Weight (kg)</label>
            <input
              type="number"
              required ={true}
              max={100}
              placeholder=""
              className="form-control"
              id="exampleInputexpenseCategory1"

              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }} 
            />
          </div>
          <div className="form-group">
            <label for="exampleInputmonth">Blood Group</label>
            <select id="inputState" className="form-control" onChange={(e) => {
              setBloodGroup(e.target.value); 
            }}>
              <option value={doctor}></option>
              <option defaultValue>-- Select Group --</option>

              <option value="A">A</option>
              <option value="B">B</option>
              <option value="O">O</option>
              <option value="AB">AB</option>
        


            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Disease</label>
            <input
              type="text"
              required ={true}
              placeholder="Seperated by ,"
              className="form-control"
              id="exampleInputexpenseCategory1"
              value={disease}
              onChange={(e) => {
                setDisease(e.target.value.replace(/[<>{}=]/g, (match) => {
                  // Replace each match with the corresponding replacement character
                  const replacements = {
                    '<': ',',
                    '>': '.',
                    '{': ';',
                    '}': "'",
                    '=': '!',
                  };
                  return replacements[match];
                })
            );
              }} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Last Visited Date</label>
            <input
              type="date"
              className="form-control"
              id="exampleInputexpenseCategory1"

              value={lastDate}
              onChange={(e) => {
                setLastDate(e.target.value);
              }} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Next Visit Date</label>
            <input
              type="date"
              className="form-control"
              id="exampleInputexpenseCategory1"

              value={nextDate}
              onChange={(e) => {
                setNextDate(e.target.value);
              }} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Medicines Used</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"
              placeholder="Seperated from ,"
              value={medicine}
              onChange={(e) => {
                setMedicine(e.target.value);
              }} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Lab Tests Done</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"
              value={labTests}
              placeholder="Seperated from ,"
              onChange={(e) => {
                setLabTests(e.target.value);
              }} 
            />
          </div>
        
          <div className="form-group">
            <label for="exampleInputmonth">Surgeon</label>
            <select id="inputState" className="form-control" onChange={(e) => {
              setDoctor(e.target.value); 
            }}>
              <option value={doctor}></option>
              <option defaultValue>-- Select Surgeon --</option>
              <option value="Dr. Hansi Perera">Dr. Hansi Perera</option>
                                                <option value="Dr. Ann Perera">Dr. Ann Perera</option>         
                                               <option value="Dr. Dhanuka Dhananjaya">Dr. Dhanuka Dhananjaya</option>           
                                               <option value="Dr. Sahani Rathnayaka">Dr. Sahani Rathnayaka</option>
                                               <option value="Dr. Sasini Perera">Dr. Sasini Perera</option>


            </select>
          </div>
          <br/><center>
          <button type="submit" className="btn btn-success">
            UPDATE
          </button>
          </center>
        

        </form>
        </div>
        </Card.Body>
                       </Card>
           </div>
         </Card>
       </div>
      </div>

  
  );
}
export default AddHealthDetails;