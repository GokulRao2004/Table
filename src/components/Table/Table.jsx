import React, { useState } from 'react';
import axios from 'axios';
import styles from './Table.module.css';
import { useParams } from 'react-router-dom';
import { Payment } from '../payment/Payment';
import { Modal } from '../Modal/Modal';
import { getImageUrl } from '../../utils';
import { Line } from '../Line/Line';
import { handleCheckboxChange } from '../../Functions/Table1/handleCheckBoxChange';
import { handleIncrement } from '../../Functions/Table1/handleIncrement';
import { handleDecrement } from '../../Functions/Table1/handleDecrement';
import { handleQuantityChange } from '../../Functions/Table1/handleQuantityChange';
import { handleDelete } from '../../Functions/Table2/handleDelete';
import { handleSubmit } from '../../Functions/Table2/handleSubmit'
import { handleIncrement1 } from '../../Functions/Table2/handleIncreament1';
import { handleDecrement1 } from '../../Functions/Table2/handleDecrement1';
import { handleQuantityChange1 } from '../../Functions/Table2/handleQuantityChange1';
import { handleProductChange } from '../../Functions/Table2/handleProductChange';
import { calculateTotalWithTax } from '../../Functions/Calculations/totalWithTax';
import { roundToTwoDecimalPlaces } from '../../Functions/Calculations/roundOff';
import { calculateTotalDue } from '../../Functions/Calculations/totalDue';
import { calculateTotalNoDue } from '../../Functions/Calculations/totalNoDue';
import { calculateDiscountedTotal } from '../../Functions/Calculations/discountedTotal';
import { fetchData }from '../../Functions/FetchData/fetchData'

export const Table = () => {
 
  const { id } = useParams();
  const [prods, setProds] = useState([]);
  const [rProds, setRProds] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [cData,setCData] = useState([]);

  fetchData(setCData,setProds,setRProds,id);

  const sendJSONToAPI = (jsonData, apiUrl) => {
    axios.post(apiUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
    })
    .then(response => {
      console.log('API Response:', response.data);
    })
    .catch(error => {
      console.error('API Error:', error);
    });
  };
  const handleSaveButtonClick = () => {
    const tableDataJSON = getTableData( prods, rProds); 
    sendJSONToAPI(tableDataJSON, apiUrl);
  };
  const getTableData = (clientData, table1Data, table2Data) => {
    const transformedTable1Data = table1Data.map((row) => ({
      id: row.id,
      product: row.product,
      quantity: row.quantity,
      due: row.due,
      rate: row.rate,
      cgst:row.cgst,
      sgst:row.sgst,
      total: row.quantity * row.rate,
    }));
  
    const transformedTable2Data = table2Data.map((row) => ({
      id: row.id,
      product: row.product,
      quantity: row.quantity,
      rate: row.rate,
      total: row.quantity * row.rate,
    }));
  
    return JSON.stringify({
      clientDetails: clientData,
      billItems: transformedTable1Data,
      returns: transformedTable2Data,
    }, null, 2);
  };
  const apiUrl = 'https://webhook.site/9d89d4ed-1682-438f-8b3c-4c355ca6da58';
  return (

   <div >
    <header className={styles.head}>
      <div>
      <h2>S L N & CO</h2>
      
      </div>
      <div className={styles.client}>
        <div>
          <p>Billed To: {cData.name}</p>
          <p>Invoice Number : {cData.Bill_No}</p>
        </div>
        <p className={styles.date}>Date : {cData.Bill_Date}</p>
      </div>
      
    </header>
    < Line/>
     <h2 className={styles.Title}>Description</h2>
    <div className={styles.container}>
       
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.expand}>PRODUCT</th>
                    <th>QTY</th>
                    <th>DUE</th>
                    <th>RATE</th>
                    <th>AMOUNT</th>
                    <th>SUB TOTAL</th>
                    
                </tr>
            </thead>
            <tbody >
                { 
                    prods.map((prod)=> (
                        <tr key={prods.id}>
                            <td className={styles.expand}>{prod.product}</td>
                            <td className={styles.quantity}>
                         
                                    <button className={styles.decrement} onClick={() => handleDecrement(prod.id)}>-</button>
                                    <input
                                      className={styles.input}
                                        type='number'
                                        value={prod.quantity}
                                        min={1}
                                        onChange={(e) => handleQuantityChange(prod.id, parseInt(e.target.value, 10) || 0)}
                                      />
                                   <button className={styles.increment}onClick={() => handleIncrement(prod.id)}>+</button>
                            </td>
                            <td className={styles.cb}><input type="checkbox" checked={prod.due} onChange={() => handleCheckboxChange(prod.id)} /> </td>
                            <td className={styles.rate}>{prod.rate}</td>
                            <td className={styles.total}>{calculateDiscountedTotal(prod)}</td>
                            <td className={styles.total}>{calculateTotalWithTax(prod)}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        
        </div>
        <div><Line/>
      <h2 className={styles.Title}>Expiry/Returns</h2>
    <div className={styles.container}>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.expand}>PRODUCT</th>
            <th>QTY</th>
            <th>RATE</th>
            <th>TOTAL</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody> 
          {rProds.map((prod) => (
            <tr key={prod.id}>
              <td className={styles.expand} >
                <input 
                className={styles.product}  
                type='text'
                value={prod.product}
                onChange={(e) => handleProductChange(prod.id, e.target.value)}
              />
              </td>
              <td className={styles.quantity}>
                <button className={styles.decrement} onClick={() => handleDecrement1(prod.id)}>-</button>
                  <input
                  className={styles.input}
                    type='number'
                    value={prod.quantity}
                    min={1}
                    onChange={(e) => handleQuantityChange1(prod.id, parseInt(e.target.value, 10) || 0)}
                  />
                <button className={styles.increment} onClick={() => handleIncrement1(prod.id)}>+</button>
              </td>
              <td className={styles.rate}>{prod.rate}</td>
              <td className={styles.total}> {roundToTwoDecimalPlaces(prod.quantity * prod.rate)}</td>
              <td className={styles.delete}>
                  <button className={styles.deletebtn} onClick={() => handleDelete(prod.id)}><img className={styles.deleteImg} src={getImageUrl('delete.png')}/></button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
    <button className='btn' onClick={() => setmodalOpen(true)}>Add</button>
     {modalOpen && 
     <Modal 
        closeModal = {()=>{
          setmodalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit = {handleSubmit}
      
     />}
        </div>
        < Line />
        <Payment noDue = {calculateTotalNoDue(prods,rProds)} due={calculateTotalDue(prods,rProds)} />
        <button onClick={handleSaveButtonClick}>Save JSON</button>
    
    </div>
  )
}
