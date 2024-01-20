import React, { useState } from 'react';
import Modal from 'react-modal';

import data from '../Table/data.json';

// Initialize Modal for use throughout the component
Modal.setAppElement('#root');

export const Table = () => {
    const [prods, setProds] = useState(data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        product: '',
        quantity: 0,
        rate: 0,
        due: false,
    });

    const handleCheckboxChange = (productId) => {
        setProds((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? { ...product, due: !product.due } : product
            )
        );
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewItem({
            product: '',
            quantity: 0,
            rate: 0,
            due: false,
        });
    };

    const addItemToTable = () => {
        setProds((prevProducts) => [
            ...prevProducts,
            {
                id: prevProducts.length + 1,
                ...newItem,
            },
        ]);
        closeModal();
    };

    return (
        <div className={styles.container}>
            <h2>Products</h2>
            <button onClick={openModal}>Add Item</button>
            <table>
                <thead>
                    <tr>
                        <th>PRODUCT</th>
                        <th>QTY</th>
                        <th>DUE</th>
                        <th>RATE</th>
                    </tr>
                </thead>
                <tbody>
                    {prods.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.product}</td>
                            <td>{prod.quantity}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={prod.due}
                                    onChange={() => handleCheckboxChange(prod.id)}
                                />
                            </td>
                            <td>{prod.rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add New Item Modal"
            >
                <h2>Add New Item</h2>
                <label>
                    Product:
                    <input
                        type="text"
                        value={newItem.product}
                        onChange={(e) => setNewItem({ ...newItem, product: e.target.value })}
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    />
                </label>
                {/* Due column is excluded from input */}
                <label>
                    Rate:
                    <input
                        type="number"
                        value={newItem.rate}
                        onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })}
                    />
                </label>
                <button onClick={addItemToTable}>Add</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
};
