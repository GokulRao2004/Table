export const handleIncrement1 = (productId) => {
    setRProds((prevProducts) =>
      prevProducts.map((product) =>
      product.id === productId && product.quantity > 0 ? { ...product, quantity: parseInt(product.quantity) + 1 } : product
      )
    );
  };