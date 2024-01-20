import React, { useState } from 'react';
import styles from './Table.module.css';
import data from './data.json';

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
  return (
    <div className={styles.container}>
        <h2>Products</h2>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>PRODUCT</th>
                    <th>QTY</th>
                    <th>DUE</th>
                    <th>RATE</th>
                    
                </tr>
            </thead>
            <tbody >
                { 
                    prods.map((prod)=> (
                        <tr key={prods.id}>
                            <td className={styles.expand}>{prod.product}</td>
                            <td className={styles.quantity}>
                                    <button className={styles.decrement} onClick={() => handleDecrement(prod.id)}>-</button>
                                    <div className={styles.count}>{prod.quantity}</div>
                                    <button className={styles.increment}onClick={() => handleIncrement(prod.id)}>+</button>
                            </td>
                            <td className={styles.cb}><input type="checkbox" checked={prod.due} onChange={() => handleCheckboxChange(prod.id)} /> </td>
                            <td>{prod.rate}</td>
                        
                            
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
        {/* <h2>Return/Expired</h2> */}
        {/* <table className={styles.table2}>
            <thead>
                <tr>
                    <th>PRODUCT</th>
                    <th>QTY</th>
                    <th>RATE</th>
                    
                </tr>
            </thead>
        </table> */}
    </div>

  )
}
