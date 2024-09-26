import React,{ useState, useEffect, useRef} from 'react';
import { Button } from 'react-bootstrap';
import {useReactToPrint} from 'react-to-print';
import { getSales } from '../services/salesService';

export const SalesReport = () => {

  const [sales, setSales] = useState([]);

  const getMedicineSales = async () => {
    const medicineResponse = await getSales();
    setSales(medicineResponse.data);
  };

  useEffect(() => {
    getMedicineSales();
  }, []);

    const componentRef = useRef()
    const handPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'sales-data',
        onAfterPrint: () => alert('Print sucess')
    });

  return (
    <diV>
        <div ref={componentRef} style={{width: '100%', height: window.innerHeight}}>
            <h1 className='text-center my-3 border py-2'>Sales Report</h1>
            <table className='w-75 mx-auto' bordered >
                <thead>
                    <th></th>
                    <th>Medicine Name</th>
                    <th>Sold Quantity</th>
                    <th>Category</th>
                    <th>Sold Price(Rs:)</th>
                    <th>Remaining Amount</th>
                </thead>
                <tbody>
                    {sales.map((sales, key) => {
                        return(
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{sales.medicineName}</td>
                                <td>{sales.soldQuantity}</td>
                                <td>{sales.category}</td>
                                <td>{sales.soldPrice}</td>
                                <td>{sales.remainingAmount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <Button variant= "danger" onClick={handPrint}>Print this out</Button>
    </diV>
  )
}
