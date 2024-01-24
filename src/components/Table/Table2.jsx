import React, { useState } from 'react';
import styles from "./Table2.module.css";
import data1 from './data1.json'; // Import JSON data directly
import { Modal } from '../Modal/Modal';

export const Table2 = () => {
  const [rProds, setRProds] = useState(data1);
  const [modalOpen, setmodalOpen] = useState(false);

  const handleIncrement = (productId) => {
    setRProds((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecrement = (productId) => {
    setRProds((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
      )
    );
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setRProds((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };
  const handleDelete = (productId) => {
    setRProds((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleSubmit = (newRow) =>{
    setRProds([...rProds, newRow])
  }


  return (
    <div>
      <h2>Expiry/Returns</h2>
    <div className={styles.container}>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>QTY</th>
            <th>RATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {rProds.map((prod) => (
            <tr key={prod.id}>
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
                <button className={styles.increment} onClick={() => handleIncrement(prod.id)}>+</button>
              </td>
              <td>{prod.rate}</td>
              <td>
                  <button className={styles.deletebtn} onClick={() => handleDelete(prod.id)}><img className={styles.delete} src='../../../assets/delete.png'/></button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className='btn' onClick={() => setmodalOpen(true)}>Add</button>
     {modalOpen && <Modal 
        closeModal = {()=>{
          setmodalOpen(false);
        }}
        onSubmit = {handleSubmit}
      
     />}
    </div>
  );
};
