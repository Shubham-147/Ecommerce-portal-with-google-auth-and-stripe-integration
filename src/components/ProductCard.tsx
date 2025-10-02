import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className='product-card'>
      <div className='product-image-container'>
        <img src={product.image} alt={product.name} className='product-image' />
        <span className='product-category'>{product.category}</span>
      </div>

      <div className='product-info'>
        <h3 className='product-name'>{product.name}</h3>
        <p className='product-description'>{product.description}</p>

        <div className='product-footer'>
          <div className='product-price-stock'>
            <span className='product-price'>₹{product.price.toFixed(2)}</span>
            <span className='product-stock'>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <button
            className='add-to-cart-btn'
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
