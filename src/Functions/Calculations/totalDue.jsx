export const calculateTotalDue = (prods,rProds) => {
    // Calculate the total with due considering only the amount from the products table
    const totalWithDue = prods.reduce((total, product) => {
      return Math.round((total + (product.due ? 0 : product.quantity * product.rate))*100)/100;
    }, 0);
    const totalFromReturns = rProds.reduce((total, product) => {
      return total + product.quantity * product.rate;
    }, 0);
    
    return totalWithDue - totalFromReturns;
    };
    