import React from 'react';
import {Link} from 'react-router-dom'
function ManagerHeader(){


          return(
           
            <nav className="navbar navbar-expand-lg  " style={{backgroundColor:"#004166"}}>
            <div className="container-fluid d-flex">
              <a className="navbar-brand" href="#" style={{color:"white"}} >JOM Coco Oil</a>
              
              <div className="float-right " id="navbarNav" >
                <ul className="navbar-nav">
                  
                <li className="nav-item">
                    <a className="nav-link text-light" href="/reqcoco">Get Coco</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link text-light" href="/allsupply">All supplies</a>
                  </li>
                  
                
                  <li className="nav-item">
                    <a className="nav-link text-light " href="/allsuppliers">Suplier details</a>
                  </li>
                  
                  
                  <li className="nav-item">
                    <a className="nav-link text-muted" href="/suppliersignupandlogin">Logout</a>
                  </li>
        
                </ul>
              </div>
            </div>
          </nav>

          )


}
export default ManagerHeader;
