import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/slices/productSlice';

const ProductForm = () => {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productImageUrl, setProductImageUrl] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);
            setProductImageUrl('');
        }
    };

    const handleImageUrlChange = (e) => {
        setProductImageUrl(e.target.value);
        setProductImage(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        if (productImage) {
            formData.append('image', productImage);
        } else {
            formData.append('imageUrl', productImageUrl);
        }
        dispatch(addProduct(formData));
        setProductName('');
        setProductPrice('');
        setProductImage(null);
        setProductImageUrl('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <input type="number" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input type="text" placeholder="Or Enter Image URL" value={productImageUrl} onChange={handleImageUrlChange} />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
