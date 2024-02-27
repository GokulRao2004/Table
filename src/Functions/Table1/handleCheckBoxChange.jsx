export const handleCheckboxChange = (productId) => {
    setProds((prevProducts) =>
        prevProducts.map((product) =>
        product.id === productId ? { ...product, due: !product.due } : product
        )
    );
    };