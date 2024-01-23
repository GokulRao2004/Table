import React,{useState} from 'react'

export const Payment = ({noDue,due}) => {
  const [selectedPercentage, setSelectedPercentage] = useState(0.5);
  const [cashDiscount, setCashDiscount] = useState(0);

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

  return (
    <form>
        <div>
            <h2>Cash Discount</h2>
            <select id="dropdown" name="dropdown" onChange={handleDropdownChange} value={selectedPercentage}>
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
            <select id="dropdown" name="dropdown">
                <option value="full">FULL</option>
                <option value="partial">PARTIAL</option>
                <option value="none">NONE</option>
            </select>
            <button className="submit">SUBMIT</button>
            
        </div>
    </form>
  )
}