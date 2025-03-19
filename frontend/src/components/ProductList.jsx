import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/slices/productSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {products.map((product) => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <img src={`http://localhost:5000${product.image}`} alt={product.name} width="100" />
                    <button onClick={() => dispatch(deleteProduct(product._id))}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
