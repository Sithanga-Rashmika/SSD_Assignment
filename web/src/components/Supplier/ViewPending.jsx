import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import SupHeader from './Header'
import Swal from 'sweetalert2'
import jsPDF from "jspdf";


function ViewPending(){

  const [serQuery,setSearch] = useState("");



  //const navigate = useNavigate()

          const [oldEntrys,setPending]=useState([]);

          useEffect(()=>{
                     getPending();
                    

          },[])

          function getPending(){
            
            axios.get("http://localhost:8889/supplier/supplyview",{
                      headers: {
                        'Authorization': "bearer "+localStorage.getItem('token')
                      }
                    }).then((res) => {
                      
                      setPending(res.data);

                      


                    }).catch((err) => {
                      alert(err)
                    })
                   
           
  } 

          console.log(oldEntrys);

          


          function deleterow(value){
                    console.log(value);


                    Swal.fire({
                      title: 'Are you need delete this entry?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#008000',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes!',
                      cancelButtonText: 'No!'

                    }).then((result) => {

                      if (result.isConfirmed) {
                        axios.delete("http://localhost:8889/supplier/supplyform/delete/"+value, {
                          headers: {
                          'Authorization': "bearer "+localStorage.getItem('token')
                          }
                          }).then((res) => {
                            Swal.fire(
                              'Deleted!',
                              'Your entry has been deleted.',
                              'success'
                            )
                         
                          getPending();
                          }).catch((err) => {
                          alert(err)
                          })
                  
                      }
                    })






                    


                  


          }////delete

          function updaterow(value){
            window.location.href='/formupdate/'+value;
          }

          function Searchfun(e){
          
            setSearch(e.target.value)
        
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
                  doc.text("Pending supplies",20,10);
                  doc.autoTable({
                        head: [['ID', 'Amount', 'Location','Price','Date']],
                        body:  oldEntrys.filter(items=>
      
                          items.amount.toLowerCase().includes(serQuery) ||
                          items.location.toLowerCase().includes(serQuery)
                                 
                              ).map(function(items,index){
                                        return( 
                                       [ index+1 ,
                                        items.amount , 
                                        items.location,
                                        items.price,
                                        items.Day.split('T')[0]
                                      ] 
                                           
                                                  
                                        );
                              }) 
      
                              })
                  
      
                  doc.save("Supplier Details.pdf");
  
              })
        
  
      }



          return(<div>
             <SupHeader/> 
               

                              <h1 className='mb-4 hometext5'>Pending supplies</h1>
                              <div className="float-right serfun">
                              <div className="d-flex ">
                              <input placeholder="Search...." onChange={Searchfun} className="form-control searchbar"/>
                              <button  className="btn btn-secondary pdfbtn" onClick={downloadPDF}><i className="bi bi-file-earmark-arrow-down-fill "></i>  Download PDF</button>
                              </div>
                              </div>
                              <table className="table table-striped table-hover">
                              <thead class="thead-dark">
                              <tr>
                                       <th scope="col">    ID </th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Update</th>
                                        <th scope="col">Delete</th>
                               </tr>          
                              
                               </thead>
                               <tbody>
                              
                              
                           {
                              oldEntrys.filter(items=>

                                items.amount.toLowerCase().includes(serQuery) ||
                                items.location.toLowerCase().includes(serQuery)
                                
                                ).map(function(items,index){
                                        return( <tr>
                                        <td>{index+1} </td>
                                        <td>{items.amount} KG  </td>
                                        <td>{items.location}</td>
                                        <td>RS {items.price}</td>
                                        <td>{items.Day.split('T')[0]}</td>
                                        <td><button type="button" class="btn  test2" onClick={e=>updaterow(items._id)}>
                                        <i class="bi bi-arrow-clockwise"></i> Update
                                        </button></td>
                                        <td><button type="button" class="btn btn-danger test" onClick={e=>deleterow(items._id)}>
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

export default ViewPending;