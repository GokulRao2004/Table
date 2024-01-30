import React, { useState, useEffect} from 'react';
import {  useParams} from 'react-router-dom';
import styles from './Table.module.css';
// import data1 from './data1.json';
// import data from './data.json';
import {Payment} from '../payment/Payment'
import {Modal} from '../Modal/Modal'
import { getImageUrl } from '../../utils';
import { Line } from '../Line/Line';
import  axios from 'axios'

export const Table = () => {
 
  const { id } = useParams();
  const [prods, setProds] = useState([]);
  const [rProds, setRProds] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [cData,setCData] = useState([]);

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
      table1Data: transformedTable1Data,
      table2Data: transformedTable2Data,
    }, null, 2);
  };


  // const saveJSONToFile = (jsonData, fileName) => {
  //   const blob = new Blob([jsonData], { type: 'application/json' });
  
  //   const a = document.createElement('a');
  //   a.href = URL.createObjectURL(blob);
  //   a.download = fileName;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(a.href);
  // };

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
  

  const apiUrl = 'https://webhook.site/42b076f3-e707-4d25-8aea-6cc1a02e6446';
 


  const handleSaveButtonClick = () => {
    const tableDataJSON = getTableData(cData, prods, rProds);
    // saveJSONToFile(tableDataJSON, 'EditedBill.json'); 
    sendJSONToAPI(tableDataJSON, apiUrl);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8085/get_bill/${id}`)
        setCData(response.default.clientDetails);
        setProds(response.default.billItems);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
 }, []);



console.log(cData)

  
    const handleCheckboxChange = (productId) => {
        setProds((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, due: !product.due } : product
          )
        );
      };
      const handleIncrement = (productId) => {
        setProds((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
          )
        );
    };

    const handleDecrement = (productId) => {
        setProds((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
          )
        );
    };
    const handleQuantityChange = (productId, newQuantity) => {
      setProds((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        )
      );
    };

    const calculateTotalNoDue = () => {
      // Calculate the total without due by subtracting the amount from the returns table
      const totalWithoutDue = prods.reduce((total, product) => {
        return total + product.quantity * product.rate;
      }, 0);
    
      const totalFromReturns = rProds.reduce((total, product) => {
        return total + product.quantity * product.rate;
      }, 0);
    
      return totalWithoutDue - totalFromReturns;
    };
    
    const calculateTotalDue = () => {
      // Calculate the total with due considering only the amount from the products table
      const totalWithDue = prods.reduce((total, product) => {
        return Math.round((total + (product.due ? 0 : product.quantity * product.rate))*100)/100;
      }, 0);
      const totalFromReturns = rProds.reduce((total, product) => {
        return total + product.quantity * product.rate;
      }, 0);
    
      return totalWithDue - totalFromReturns;
    };
    
    function roundToTwoDecimalPlaces(number) {
      return parseFloat(number).toFixed(2);
    }
 

 //FUNCTIONS FOR TABLE 2
    const handleDelete = (productId) => {
      setRProds((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    };

    const handleSubmit = (newRow) =>{
      setRProds([...rProds, newRow])
    }

    const handleIncrement1 = (productId) => {
      setRProds((prevProducts) =>
        prevProducts.map((product) =>
        product.id === productId && product.quantity > 0 ? { ...product, quantity: parseInt(product.quantity) + 1 } : product
        )
      );
    };
  
    const handleDecrement1 = (productId) => {
      setRProds((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
        )
      );
    };
  
    const handleQuantityChange1 = (productId, newQuantity) => {
      setRProds((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        )
      );
    };


  return (

   <div >
    <header className={styles.head}>
      <div>
      <h2>S L N & CO</h2>
      
      </div>
      <div className={styles.client}>
        <div>
          <p>Billed To: {cData.name}</p>
          <p>{cData.Bill_No}</p>
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
                    <th>TOTAL</th>
                    <th>AFTER TAX</th>
                    
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
                            <td className={styles.total}> {roundToTwoDecimalPlaces((prod.quantity* prod.rate))} </td>
                            <td className={styles.total}> {roundToTwoDecimalPlaces((prod.quantity* prod.rate) + ((prod.quantity* prod.rate) * ((prod.cgst + prod.sgst)/100)))} </td>
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
              <td className={styles.expand}>{prod.product}</td>
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
        }}
        onSubmit = {handleSubmit}
      
     />}
        </div>
        < Line />
        <Payment noDue = {calculateTotalNoDue()} due={calculateTotalDue()} />
        <button onClick={handleSaveButtonClick}>Save JSON</button>
    
    </div>
  )
}
