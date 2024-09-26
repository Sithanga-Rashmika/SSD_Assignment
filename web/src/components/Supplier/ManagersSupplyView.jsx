
import React,{useState,useEffect} from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import ManagerHeader from "./supManagerHeader";
import Swal from 'sweetalert2'



function ManagersView(){

      const [Alldata,setAll]=useState([]);
      const [serQuery,serSetQuery] = useState("");

          useEffect(()=>{
                     function getCount(){
                              axios.get("http://localhost:8889/supplier/supplymanager").then((res)=>{
                                        
                                       console.log(res.data);
                                       let edaa = res.data;
                                       setAll(edaa);
                              })
                             
                    } getCount();

          },[]);


         // console.log(Alldata);

  function deleteRow(event){
      alert("Are you sure");
            axios.delete("http://localhost:8889/supplier/deleteentrys/"+event).then(function(res){
                  alert(res.data);
                  window.location.reload();   //////////////// test ekak 
            }).catch(function(err){
                  alert(err);
            }

            )

          }


          console.log(serQuery);
          console.log(Alldata.filter(items=>items.location.toLowerCase().includes("k")));


          function Searchfun(e){
            serSetQuery(e.target.value);
          }


          


          function downloadPDF(){
            let timerInterval
            Swal.fire({
            title: 'Preparing your PDF',
            html: 'Please wait <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
            }).then(()=>{
            const doc = new jsPDF();
            doc.text("Available Supplies",20,10);
            console.log(Alldata[0]);
            doc.autoTable({
                  head: [['ID', 'SupName', 'Amount','Location','Phone Number','Price','Date']],
                  body:  Alldata.filter(items=>

                        items.spName.toLowerCase().includes(serQuery) ||
                        items.amount.toLowerCase().includes(serQuery) ||
                        items.location.toLowerCase().includes(serQuery) ||
                        items.Day.includes(serQuery)
                        
                        ).map(function(items,index){
                                  return( 
                                 [ index+1 ,
                                  items.spName , 
                                  items.amount + "KG",
                                  items.location,
                                  items.tpNumber,
                                  items.price,
                                  items.Day.split('T')[0]] 
                                     
                                            
                                  );
                        }) 

                        })
            

            doc.save("Available Supplies.pdf");

              })
          }



          return(<div>
            <ManagerHeader/>
                              <h1 className='mb-4 hometext5'>All supplies</h1>
                              <div className="float-right serfun">
                                <div className="d-flex ">
                                <input onChange={Searchfun} placeholder="Search...." className="form-control searchbar"/>
                                <button onClick={downloadPDF} className="btn btn-secondary pdfbtn"><i className="bi bi-file-earmark-arrow-down-fill "></i>  Download PDF</button>
                                </div>
                                </div>
                              <table className="table table-striped table-hover">
                              <thead class="thead-dark">
                              <tr>
                              <th scope="col">ID</th>
                              <th scope="col">SupName</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Location</th>
                              <th scope="col">Phone Number</th>
                              <th scope="col">Price</th>
                              <th scope="col">Date</th>
                              <th scope="col">Delete</th>
                              </tr>

                              </thead>

                              <tbody>

                    {
                              Alldata.filter(items=>

                              items.spName.toLowerCase().includes(serQuery) ||
                              items.amount.toLowerCase().includes(serQuery) ||
                              items.location.toLowerCase().includes(serQuery) ||
                              items.Day.includes(serQuery)
                              
                              ).map(function(items,index){
                                        return( <tr>
                                        <td>{index+1} </td>
                                        <td>{items.spName}  </td>
                                        <td>{items.amount} KG</td>
                                        <td>{items.location}</td>
                                        <td>{items.tpNumber}</td>
                                        <td>{items.price}</td>
                                        <td>{items.Day.split('T')[0]}</td>
                                        <td><button type="button" class="btn btn-danger test" onClick={e=>deleteRow(items._id)}>
                                          <i class="bi bi-trash text-light"></i> Delete
                                        </button></td>
                                        </tr>
                                                 
                                                  
                                        );
                              })

                        }
                        </tbody>
                        </table>

                     



          </div>)
}

export default ManagersView;