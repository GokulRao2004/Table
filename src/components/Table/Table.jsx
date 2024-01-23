import React, { useState } from 'react';
import styles from './Table.module.css';
import data from './data.json';
import {Payment} from '../payment/Payment'

export const Table = () => {
    const [prods,setProds] = useState(data);



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
      return prods.reduce((total, product) => {
        return total + product.quantity * product.rate;
      }, 0);
    };

    const calculateTotalDue = () => {
      return prods.reduce((total, product) => {
        return total + (product.due ? 0 : product.quantity * product.rate);
      }, 0);
    };

  return (
  <div>
     <h2>Products</h2>
    <div className={styles.container}>
       
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>PRODUCT</th>
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
                            <td>{prod.rate}</td>
                            <td > <input className={styles.tot} value = {prod.quantity * prod.rate} /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table></div>
        <div>Total Without Due: {calculateTotalNoDue()}</div>
        <div>Total With Due: {calculateTotalDue()}</div>
        <Payment noDue = {calculateTotalNoDue()} due={calculateTotalDue()} />
    
    </div>
  )
}
