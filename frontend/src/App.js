import React, { useState, useEffect } from 'react';

function App() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const addProduct = () => {
        fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => setProducts([...products, data]));
    };

    return (
        <div>
            <h1>eCommerce Store</h1>
            <input placeholder="Name" onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input placeholder="Price" onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
            <input placeholder="Description" onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
            <button onClick={addProduct}>Add Product</button>

            <ul>
                {products.map((p, idx) => (
                    <li key={idx}>{p.name} - ${p.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
