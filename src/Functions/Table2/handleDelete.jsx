export const handleDelete = (productId) => {
    setRProds((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };
