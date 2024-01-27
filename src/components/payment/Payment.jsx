import React,{useState} from 'react';
import styles from './Payment.module.css';
import { Line } from '../Line/Line';

export const Payment = ({noDue,due}) => {
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('full');

  const calculateCashDiscount = (totalAmount) => {
    const discountPercentage = parseFloat(selectedPercentage);
    const discount = (totalAmount * discountPercentage) / 100;
    return discount;
  };

  const cashDisc = (totalAmount) => {
    const discount = calculateCashDiscount(totalAmount);
    return discount;
  };

  const handleDropdownChange = (e) => {
    setSelectedPercentage(e.target.value);
  };
  const handlePaymentOptionChange = (e) => {
    setSelectedPaymentOption(e.target.value);
  };

  const renderPartialPaymentTextBox = () => {
    if (selectedPaymentOption === 'partial') {
      return (
        <div className={styles.payPartial}>
          
            <>Amount Payed : </>
            <input type="number" min={1} placeholder="Enter amount" />
      
        </div>
      );
    }
    return null;
  };
  function roundToTwoDecimalPlaces(number) {
    return parseFloat(number).toFixed(2);
  }

  return (
    <form>
        <div>
          <div className={styles.cd}>
            <>Cash Discount : </>
            <select id="dropdown" className={styles.dropdown} onChange={handleDropdownChange} value={selectedPercentage}>
                <option value={0}>0%</option>
                <option value={0.5}>0.5%</option>
                <option value={1}>1%</option>
                <option value={1.5}>1.5%</option>
                <option value={2}>2%</option>
                <option value={2.5}>2.5%</option>
                <option value={3}>3%</option>
                <option value={3.5}>3.5%</option>
            </select>
           
          </div> <Line/>
          <div className={styles.amount}>
            <h2>Total Amount</h2>
            <div>Without Due : {roundToTwoDecimalPlaces(due - cashDisc(due))} </div>
            <div>With Due : {roundToTwoDecimalPlaces(noDue - cashDisc(noDue))} </div>
          </div>
          <Line/>
          <div className={styles.payment}>
            <div className={styles.paySelect}>
            <>Payment : </>
            <select id="dropdown" className={styles.dropdown} onChange={handlePaymentOptionChange} value={selectedPaymentOption}>
                <option value="full">FULL</option>
                <option value="partial">PARTIAL</option>
                <option value="none">NONE</option>
            </select>
            {renderPartialPaymentTextBox()}
          </div>
          </div>
          <div className={styles.subBtn}>
            <button className={styles.btn} >SUBMIT</button>
          </div>
        </div>
    </form>
  )
}
