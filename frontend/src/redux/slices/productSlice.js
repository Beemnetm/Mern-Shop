import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Add product
export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
    const response = await axios.post(API_URL, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
});

// Delete product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState: { products: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
            });
    },
});

export default productSlice.reducer;