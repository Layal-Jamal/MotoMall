import React from 'react';
import { FaUserCircle, FaMapMarkerAlt } from 'react-icons/fa';
import imag33 from '../../assets/images/honda.jfif';
import './ShoppingCard.css';
import { useNavigate } from 'react-router-dom';

const ShoppingCard = ({ title, category, price, imageCover, id , seller }) => {
  const navigate = useNavigate();
 
  
  const handleView = () => {
    if (id) {
      navigate(`/Shopping/CarDetails/${id}`);
    }
  };
  
  return (
    <div className='card-shop'>
      <div className='cardheader-shop'>
        <div className='seller-name-only'>
          {seller.toUpperCase()}
        </div>
        <span className='favorite-icon'>
          <FaUserCircle />
        </span>
      </div>

      <div className='card-shop-image'>
        <img src={imageCover}  className='img-fluid' alt={title} />
      </div>

      <div className='cardshop-content'>
        <div className='location-category-section'>
          <div className='location-item'>
            <FaMapMarkerAlt className='location-icon' />
            <span className='product-category'>{category?.toUpperCase()}</span>
          </div>
        </div>

        <h3 className='product-title'>{title}</h3>

        <div className='product-meta'>
          <div className='product-price'>{price} $</div>
          <button className='view-button' onClick={handleView}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;