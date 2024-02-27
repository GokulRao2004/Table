export const handleDecrement = (productId) => {
    setProds((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
      )
    );
  };