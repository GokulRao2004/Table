export const handleQuantityChange1 = (productId, newQuantity) => {
    setRProds((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };
