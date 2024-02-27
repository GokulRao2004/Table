export const handleProductChange = (id, value) => {
    setRProds((prevProducts) => {
      const updatedProducts = prevProducts.map((prod) =>
        prod.id === id ? { ...prod, product: value } : prod
      );
      return updatedProducts;
    });
  };
