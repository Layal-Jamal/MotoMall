import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyPost.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaTag } from 'react-icons/fa';

const MyPost = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const fetchUserProducts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/v1/products/user/my-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userProducts = response.data.data.products;
      setProducts(userProducts); // تم إضافة هذا السطر المفقود
      
    } catch (error) {
      console.error('Error fetching user products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:8000/api/v1/products/user/my-products/${productToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter(product => product._id !== productToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert("Failed to delete the product.");
      closeDeleteModal();
    }
  };

  if (loading) return <div className="loading-container"><p className="loading-text">Loading your posts...</p></div>;

  return (
    <div className="myposts-container">
      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h2 className="myposts-title">My Posts</h2>
      </div>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="myposts-grid">
          {products.map((product) => (
            <div key={product._id} className="mypost-card">
              <div className="mypost-image-container">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="mypost-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
                <div className="mypost-overlay">
                  <span className="mypost-price">${product.price}</span>
                </div>
              </div>

              <div className="mypost-content">
                <h3 className="mypost-title">{product.title}</h3>
                <p className="mypost-description">{product.description}</p>
                
                <div className="mypost-details">
                  <div className="mypost-detail-item">
                    <FaMapMarkerAlt className="mypost-detail-icon" />
                    <span>{product.category?.name || 'N/A'}</span>
                  </div>
                  
                  <div className="mypost-detail-item">
                    <FaCalendarAlt className="mypost-detail-icon" />
                    <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mypost-actions">
                  <button 
                    onClick={() => handleEdit(product._id)} 
                    className="mypost-edit-btn"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    onClick={() => openDeleteModal(product._id)} 
                    className="mypost-delete-btn"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="myposts-empty">
          <div className="myposts-empty-icon">📝</div>
          <h3 className="myposts-empty-title">No Posts Yet</h3>
          <p className="myposts-empty-text">You haven't posted any products yet.</p>
          <button 
            className="myposts-empty-btn"
            onClick={() => navigate('/AddCarForm')}
          >
            Create Your First Post
          </button>
        </div>
      )}

      <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default MyPost;