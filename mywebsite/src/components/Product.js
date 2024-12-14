import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const { brandId, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [brandId, productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/brands/${brandId}/products/${productId}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-container">
      <div className="product-header">
        <h2>{product.name}</h2>
        <div className="product-brand">by {product.brandName}</div>
      </div>

      <div className="product-images">
        {product.images && product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} - Image ${index + 1}`}
            className="product-image"
          />
        ))}
      </div>

      <div className="product-info">
        <div className="product-price">
          <span className="label">Price:</span>
          <span className="value">${product.price}</span>
        </div>

        <div className="product-category">
          <span className="label">Category:</span>
          <span className="value">{product.category}</span>
        </div>

        <div className="product-availability">
          <span className="label">Availability:</span>
          <span className={`value ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className="product-description">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      {product.specifications && (
        <div className="product-specifications">
          <h3>Specifications</h3>
          <ul>
            {Object.entries(product.specifications).map(([key, value]) => (
              <li key={key}>
                <span className="spec-label">{key}:</span>
                <span className="spec-value">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Product;
