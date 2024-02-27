export const calculateTotalNoDue = (prods, rProds) => {
    // Calculate the total without due by subtracting the amount from the returns table
    const totalWithoutDue = prods.reduce((total, product) => {
      return total + product.quantity * product.rate;
    }, 0);
    
    const totalFromReturns = rProds.reduce((total, product) => {
      return total + product.quantity * product.rate;
    }, 0);
    
    return totalWithoutDue - totalFromReturns;
    };
    