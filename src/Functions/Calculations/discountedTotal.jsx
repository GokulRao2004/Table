import { roundToTwoDecimalPlaces } from "./roundOff";
export const calculateDiscountedTotal = (prod) => {
    const discountedAmount = (prod.quantity * prod.rate) - ((prod.quantity * prod.rate) * prod.disc / 100.0);
    return roundToTwoDecimalPlaces(discountedAmount);
  };