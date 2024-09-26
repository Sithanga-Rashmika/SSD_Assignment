import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import ManagerHeader from "./supManagerHeader";
import Swal from 'sweetalert2'

  

function ViewSuppliers(){

    const [supDetails,setDetails] = useState([]);
    const [serQuery,setSearch] = useState("");


    function getAllSupliers(){
        axios.get("http://localhost:8889/supplier/supplymanager/allsuppliers").then((res)=>{
           
            setDetails(res.data)
        })
    }

    

    useEffect(function(){
        getAllSupliers();
    },[]);


    console.log(supDetails[0])

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
                doc.text("Supplier Details",20,10);
                doc.autoTable({
                      head: [['ID', 'Sup Uname', 'Nic','Phone Number']],
                      body:  supDetails.filter(items=>
    
                        items.username.toLowerCase().includes(serQuery) ||
                        items.nic.toLowerCase().includes(serQuery) ||
                        items.telephoneNum.toLowerCase().includes(serQuery)
                            
                            ).map(function(items,index){
                                      return( 
                                     [ index+1 ,
                                      items.username , 
                                      items.nic,
                                      items.telephoneNum
                                    ] 
                                         
                                                
                                      );
                            }) 
    
                            })
                
    
                doc.save("Supplier Details.pdf");

            })
      

    }

    function deleteRow(event){
            console.log(event)
            axios.delete("http://localhost:8889/supplier/supplymanager/supplyerdelete/"+event).then((res)=>{
                alert(res.data);
                getAllSupliers();
            })
    }


    return(<div>


        <ManagerHeader/>
       

<h1 className='mb-4 hometext5'>Supplier Details</h1>
<div className="float-right serfun">
<div className="d-flex ">
<input onChange={Searchfun} placeholder="Search...." className="form-control searchbar"/>
<button onClick={downloadPDF} className="btn btn-secondary pdfbtn"><i className="bi bi-file-earmark-arrow-down-fill "></i>  Download PDF</button>
</div>
</div>
<br /><br />
<div>
<table className="table table-striped table-hover">
<thead class="thead-dark">
<tr>
<th scope="col">Count</th>
<th scope="col">User Name</th>
<th scope="col">Nic</th>
<th scope="col">Contact Number</th>
<th scope="col">Delete supplier</th>

</tr>
</thead>

<tbody>
{
supDetails.filter(items=>

    items.username.toLowerCase().includes(serQuery) ||
    items.nic.toLowerCase().includes(serQuery) ||
    items.telephoneNum.toLowerCase().includes(serQuery)
    
    ).map(function(items,index){
          return( <tr>
          <td>{index+1} </td>
          <td>{items.username}  </td>
          <td>{items.nic}</td>
          <td>{items.telephoneNum}</td>
          {/* <td><button  onClick={e=>deleteRow(items._id)} >Delete</button></td> */}
          <td><button type="button" class="btn btn-danger test" onClick={e=>deleteRow(items._id)}>
          <i class="bi bi-trash text-light"></i> Delete
        </button></td>
          </tr>
                   
                    
          );
})

}
</tbody>
</table> 
</div>


{/* ------------------------------ */}



{/* ------------------------------ */}

    </div>)
}

export default ViewSuppliers;