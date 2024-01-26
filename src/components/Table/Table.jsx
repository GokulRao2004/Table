import React, { useState } from 'react';
import styles from './Table.module.css';
import data1 from './data1.json';
import data from './data.json';
import {Payment} from '../payment/Payment'
import {Modal} from '../Modal/Modal'
import { getImageUrl } from '../../utils';
import { Line } from '../Line/Line';

export const Table = () => {
    const [prods,setProds] = useState(data.billItems);
    const [rProds, setRProds] = useState(data1);
    const [modalOpen, setmodalOpen] = useState(false);
    

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
    
      return totalWithDue;
    };
    
 

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
          <p>Billed To: {data.clientDetails.name}</p>
          <p>{data.clientDetails['Bill No']}</p>
        </div>
        <p className={styles.date}>Date : {data.clientDetails['Bill Date']}</p>
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
                            <td className={styles.total}> {Math.round( prod.quantity* prod.rate* 100) / 100} </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {/* <div>{calculateTotalDue()}</div>
        <div>{calculateTotalNoDue()}</div> */}
        
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
              <td className={styles.total}> {Math.round(prod.quantity * prod.rate * 100)/100}</td>
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
    
    </div>
  )
}
