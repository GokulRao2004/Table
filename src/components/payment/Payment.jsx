import React,{useState} from 'react'

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
        <>
          <h2>Partial Payment Amount</h2>
          <input type="text" placeholder="Enter partial payment amount" />
        </>
      );
    }
    return null;
  };

  return (
    <form>
        <div>
            <h2>Cash Discount</h2>
            <select id="dropdown" name="dropdown" onChange={handleDropdownChange} value={selectedPercentage}>
                <option value={0}>0%</option>
                <option value={0.5}>0.5%</option>
                <option value={1}>1%</option>
                <option value={1.5}>1.5%</option>
                <option value={2}>2%</option>
                <option value={2.5}>2.5%</option>
                <option value={3}>3%</option>
                <option value={3.5}>3.5%</option>
            </select>
            <h2>Total Amount</h2>
            <label for="With">With Due</label>
            <input type='text' value={due - cashDisc(due)} disabled></input>
            <br/>
            <label for="Without">Without Due</label>
            <input type='text' value={noDue - cashDisc(noDue)} disabled></input>
            <h2>Payment</h2>
            <select id="dropdown" name="dropdown" onChange={handlePaymentOptionChange} value={selectedPaymentOption}>
                <option value="full">FULL</option>
                <option value="partial">PARTIAL</option>
                <option value="none">NONE</option>
            </select>
            {renderPartialPaymentTextBox()}
            <button className="submit" >SUBMIT</button>
            
        </div>
    </form>
  )
}
