import { roundToTwoDecimalPlaces } from "./roundOff";
export const calculateTotalWithTax = (prod) => {
    const totalWithTax = (prod.quantity * prod.rate) + ((prod.quantity * prod.rate) * ((prod.cgst + prod.sgst) / 100));
    return roundToTwoDecimalPlaces(totalWithTax);
  };