export const handleDecrement1 = (productId) => {
    setRProds((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
      )
    );
  };
