import styles from './Modal.module.css'
import React, { useState } from 'react'

export const Modal = ({closeModal, onSubmit}) => {
    const [formState,setFormState] = useState({
        product : "",
        quantity : "",
        rate : "",
    });

    const handleChange = (e) =>{
        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!(formState.product && formState.quantity && formState.rate)) {return};
        onSubmit(formState)
        closeModal()
      };


  return (
    <div className={styles.container} id='close' onClick={(e) => {
        if (e.target.id=== 'close') 
            closeModal();
        }}>
        <div className={styles.modal}>
            <form className={styles.form} >
                <div className={styles.formGrp}>
                    <label htmlFor='name'>Product Name : </label>
                    <input name='product' value={formState.product} onChange={handleChange}/>
                </div>
                <div className={styles.formGrp}>
                    <label htmlFor='quantity'>Quantity</label>
                    <input name='quantity' type='number' min={1} value={formState.quantity} onChange={handleChange}/>
                </div>
                <div className={styles.formGrp}>
                    <label htmlFor='rate'>Rate</label>
                    <input name="rate" type='number' min={1} value={formState.rate} onChange={handleChange}/>
                </div>
                <button type='submit' className={styles.btn} onClick={handleSubmit}>Submit</button>
            </form>
        </div>

    </div>
  )
}
