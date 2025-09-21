import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageCover: null,
    images: [],
  });

  const [previewCover, setPreviewCover] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const product = response.data.data;

        setFormData((prev) => ({
          ...prev,
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category?.name || "",
        }));

        setPreviewCover(product.imageCover || "");
        setPreviewImages(product.images || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageCover: file }));
      setPreviewCover(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);

      const selectedGovernorate = governorates.find(
        (gov) => gov.value === formData.category
      );
      data.append("category", selectedGovernorate ? selectedGovernorate.id : "");

      if (formData.imageCover) {
        data.append("imageCover", formData.imageCover);
      }

      formData.images.forEach((img) => {
        data.append("images", img);
      });

      await axios.put(
        `http://localhost:8000/api/v1/products/user/my-products/${productId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(" Product updated successfully!");
      navigate("/mypost");
    } catch (error) {
      console.error(" Error updating product:", error.response?.data || error);
      alert("Failed to update product.");
    }
  };

  if (loading) return <p className="loading-text">Loading product data...</p>;

  return (

    <div className="edit-container">
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <h2 className="edit-title">Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Governorate (Category):</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a Governorate</option>
          {governorates.map((gov) => (
            <option key={gov.id} value={gov.value}>
              {gov.value}
            </option>
          ))}
        </select>

        <label>Cover Image:</label>
        {previewCover && (
          <div className="image-preview">
            <img src={previewCover} alt="cover" width="150" />
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleCoverChange} />

        <label>Other Images:</label>
        <div className="images-preview">
          {previewImages.map((img, idx) => (
            <img key={idx} src={img} alt={`product-${idx}`} width="120" />
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
        />

        <div className="form-actions">

          <button type="submit" className="edit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
