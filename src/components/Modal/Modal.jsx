import styles from './Modal.module.css'
import React from 'react'

export const Modal = ({closeModal}) => {
  return (
    <div className={styles.container} id='close' onClick={(e) => {
        if (e.target.id=== 'close') 
            closeModal();
        }}>
        <div className={styles.modal}>
            <form className={styles.form}>
                <div className={styles.formGrp}>
                    <label htmlFor='name'>Product Name : </label>
                    <input name='name'/>
                </div>
                <div className={styles.formGrp}>
                    <label htmlFor='quantity'>Quantity</label>
                    <input type='number' min={1}/>
                </div>
                <div className={styles.formGrp}>
                    <label htmlFor='rate'>Rate</label>
                    <input type='number' min={1}/>
                </div>
                <button type='submit' className={styles.btn}>Submit</button>
            </form>
        </div>

    </div>
  )
}
