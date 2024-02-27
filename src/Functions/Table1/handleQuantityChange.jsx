export const handleQuantityChange = (productId, newQuantity) => {
    setProds((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
    };