import React, { useState } from 'react';
import './Brands.css';

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const brands = [
    {
      id: 1,
      name: 'DMDG',
      description: 'Urban streetwear and contemporary fashion',
      location: 'Cairo, Egypt',
      rating: 9,
      products: [
        { id: 1, name: 'Hoodie', price: 399, description: 'Premium cotton blend hoodie' },
        { id: 2, name: 'Jeans', price: 449, description: 'Classic fit denim jeans' },
        { id: 3, name: 'Sweatpants', price: 349, description: 'Comfortable cotton sweatpants' },
        { id: 4, name: 'T-shirt', price: 199, description: 'Essential cotton t-shirt' },
        { id: 5, name: 'Crew Neck', price: 299, description: 'Classic fit crew neck sweatshirt' }
      ]
    },
    {
      id: 2,
      name: 'UA',
      description: 'Modern casual wear with unique designs',
      location: 'Cairo, Egypt',
      rating: 8.5,
      products: [
        { id: 1, name: 'Hoodie', price: 379, description: 'Oversized cotton hoodie' },
        { id: 2, name: 'Jeans', price: 429, description: 'Slim fit stretch jeans' },
        { id: 3, name: 'Sweatpants', price: 329, description: 'Athletic fit sweatpants' },
        { id: 4, name: 'T-shirt', price: 189, description: 'Graphic print t-shirt' },
        { id: 5, name: 'Shorts', price: 259, description: 'Comfortable cotton blend shorts' }
      ]
    },
    {
      id: 3,
      name: 'KRACKED',
      description: 'Edgy streetwear with bold graphics',
      location: 'Cairo, Egypt',
      rating: 8.8,
      products: [
        { id: 1, name: 'Hoodie', price: 389, description: 'Graphic print hoodie' },
        { id: 2, name: 'Jeans', price: 439, description: 'Distressed denim jeans' },
        { id: 3, name: 'Sweatpants', price: 339, description: 'Street style sweatpants' },
        { id: 4, name: 'T-shirt', price: 195, description: 'Urban design t-shirt' },
        { id: 5, name: 'Shorts', price: 269, description: 'Street style cargo shorts' }
      ]
    },
    {
      id: 4,
      name: 'FRAGILE',
      description: 'Premium quality essentials and basics',
      location: 'Cairo, Egypt',
      rating: 9.2,
      products: [
        { id: 1, name: 'Hoodie', price: 409, description: 'Luxury cotton hoodie' },
        { id: 2, name: 'Jeans', price: 459, description: 'Premium denim jeans' },
        { id: 3, name: 'Sweatpants', price: 359, description: 'Premium cotton sweatpants' },
        { id: 4, name: 'T-shirt', price: 209, description: 'Premium basic t-shirt' }
      ]
    },
    {
      id: 5,
      name: 'JEANIUS',
      description: 'Specialized in premium denim and casual wear',
      location: 'Cairo, Egypt',
      rating: 8.7,
      products: [
        { id: 1, name: 'Hoodie', price: 399, description: 'Denim accent hoodie' },
        { id: 2, name: 'Jeans', price: 469, description: 'Signature denim jeans' },
        { id: 3, name: 'Sweatpants', price: 349, description: 'Denim-inspired sweatpants' },
        { id: 4, name: 'T-shirt', price: 199, description: 'Denim pocket t-shirt' }
      ]
    },
    {
      id: 6,
      name: 'OUTDATED',
      description: 'Vintage-inspired contemporary fashion',
      location: 'Cairo, Egypt',
      rating: 8.9,
      products: [
        { id: 1, name: 'Hoodie', price: 369, description: 'Vintage style hoodie' },
        { id: 2, name: 'Jeans', price: 419, description: 'Vintage wash jeans' },
        { id: 3, name: 'Sweatpants', price: 319, description: 'Retro style sweatpants' },
        { id: 4, name: 'T-shirt', price: 179, description: 'Vintage graphic t-shirt' },
        { id: 5, name: 'Crew Neck', price: 279, description: 'Vintage washed crew neck sweatshirt' }
      ]
    }
  ];

  const handleBrandClick = (brand) => {
    setSelectedBrand(selectedBrand?.id === brand.id ? null : brand);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredBrands = brands.filter(brand => {
    const hasMatchingProduct = brand.products.some(product =>
      product.name.toLowerCase().includes(searchQuery)
    );
    return hasMatchingProduct || searchQuery === '';
  });

  return (
    <div className="brands-container">
      <h2>Local Brands</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products (e.g., Hoodie, Jeans, T-shirt)"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="brands-grid">
        {filteredBrands.map(brand => (
          <div 
            key={brand.id} 
            className={`brand-card ${selectedBrand?.id === brand.id ? 'expanded' : ''}`}
            onClick={() => handleBrandClick(brand)}
          >
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
            <p>Location: {brand.location}</p>
            <div className="rating">Rating: {brand.rating}/10</div>
            
            {selectedBrand?.id === brand.id && (
              <div className="products-grid">
                <h4>Products</h4>
                {brand.products
                  .filter(product => 
                    searchQuery === '' || 
                    product.name.toLowerCase().includes(searchQuery)
                  )
                  .map(product => (
                    <div key={product.id} className="product-card">
                      <h5>{product.name}</h5>
                      <p>{product.description}</p>
                      <p className="price">EGP {product.price}</p>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
