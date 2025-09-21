import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCarForm.css';

const AddCarForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    governorate: '',
    title: '',
    description: '',
    price: '',
    quantity: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageCover, setImageCover] = useState(null);
  const [imageCoverPreview, setImageCoverPreview] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreviews, setImagesPreviews] = useState([]);

  const governorates = [
    { value: "Damascus", id: "68ac68bac7ea8c4c63b321d8" },
    { value: "Aleppo", id: "68ac6949c7ea8c4c63b321eb" },
    { value: "Homs", id: "68ac5c602550cc153f0b30bc" },
    { value: "Latakia", id: "68ac68eec7ea8c4c63b321dc" },
    { value: "Hama", id: "68ac68c0c7ea8c4c63b321da" },
    { value: "Tartous", id: "68ac6901c7ea8c4c63b321de" },
    { value: "Deir ez-Zor", id: "68ac690ac7ea8c4c63b321e0" },
    { value: "Al-Hasakah", id: "68ac6942c7ea8c4c63b321e9" },
    { value: "Raqqa", id: "68ac6912c7ea8c4c63b321e2" },
    { value: "Idlib", id: "68ac6924c7ea8c4c63b321e6" },
    { value: "As-Suwayda", id: "68ac695cc7ea8c4c63b321ed" },
    { value: "Daraa", id: "68ac691bc7ea8c4c63b321e4" },
    { value: "Quneitra", id: "68ac696fc7ea8c4c63b321ef" }
  ];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageCover(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages(files);

      const previews = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setImagesPreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagesPreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagesPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {

      const selectedGovernorate = governorates.find(gov => gov.value === formData.governorate);

      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('description', formData.description);
      dataToSend.append('quantity', parseInt(formData.quantity));
      dataToSend.append('price', parseFloat(formData.price));
      dataToSend.append('category', selectedGovernorate ? selectedGovernorate.id : formData.governorate);

      if (imageCover) {
        dataToSend.append('imageCover', imageCover);
      }

      images.forEach(image => {
        dataToSend.append('images', image);
      });

      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post('http://localhost:8000/api/v1/products', dataToSend, config);

      setMessage('Car data saved successfully!');
      console.log('Server response:', response.data);

      setFormData({
        governorate: '',
        title: '',
        description: '',
        price: '',
        quantity: '',
      });
      setImageCover(null);
      setImageCoverPreview('');
      setImages([]);
      setImagesPreviews([]);
    } catch (error) {
      console.error('Error sending data:', error);
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Failed to save data'}`);
      } else {
        setMessage('Error saving data. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">

      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="form-row">
        <div className="form-col">
          <div className="form-card">
            <div className="form-card-header">
              <h3>Car Data Entry Form</h3>
            </div>
            <div className="form-card-body">
              {message && (
                <div className={`form-alert ${message.includes('Error') ? 'form-alert-danger' : 'form-alert-success'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="form-group">
                  <label htmlFor="governorate" className="form-label">Governorate </label>
                  <select
                    className="form-select"
                    id="governorate"
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Governorate</option>
                    {governorates.map((gov, index) => (
                      <option key={index} value={gov.value}>{gov.value}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="title" className="form-label">Car Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter car type"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageCover" className="form-label">Cover Image</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      className="form-control-file"
                      id="imageCover"
                      name="imageCover"
                      onChange={handleCoverImageChange}
                      accept="image/*"
                      required
                    />
                    {imageCoverPreview && (
                      <div className="image-preview">
                        <img src={imageCoverPreview} alt="Cover preview" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="images" className="form-label">Additional Images</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      className="form-control-file"
                      id="images"
                      name="images"
                      onChange={handleImagesChange}
                      accept="image/*"
                      multiple
                    />
                    <div className="images-previews">
                      {imagesPreviews.map((preview, index) => (
                        <div key={index} className="image-preview-item">
                          <img src={preview} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">Car Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter car description"
                    required
                    minLength="20"
                  ></textarea>
                  <div className="form-text">Description must be at least 20 characters</div>
                </div>

                <div className="form-row-inner">
                  <div className="form-group form-col-inner">
                    <label htmlFor="price" className="form-label">Price ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-group form-col-inner">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-button-container">
                  <button
                    type="submit"
                    className="form-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Car Data'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarForm;