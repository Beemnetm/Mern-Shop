import React from 'react';
import ProductForm from './components/ProductForm.jsx';
import ProductList from './components/ProductList.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

const App = () => {
  return (
    <div>
      <h1>Product Management</h1>

      <ProductForm />
      <ProductList />
    </div>
  );
};

export default App;
