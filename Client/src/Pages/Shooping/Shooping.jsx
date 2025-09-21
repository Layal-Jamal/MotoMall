import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import star from '../../assets/images/gold.png';
import './Shooping.css';
import ShoppingCard from "../../components/ShoopingCard/ShoppingCard";

const Shooping = () => {
  const [dataShop, setDataShop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataShop = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/products");
      console.log("API response:", response.data);
     
      let productsData = [];
      
      // التحقق من التنسيق الجديد للبيانات
      if (response.data.data && response.data.data.products && Array.isArray(response.data.data.products)) {
        productsData = response.data.data.products;
      } else if (Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        productsData = response.data.data;
      } else if (response.data.products && Array.isArray(response.data.products)) {
        productsData = response.data.products;
      } else {
        throw new Error("Unexpected data format");
      }
      
      setDataShop(productsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed Fetch Data : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    fetchDataShop();
  };

  useEffect(() => {
    fetchDataShop();
  }, []);

  return (
    <div className="Shopping-view ">
      <NavBar />
      <div className="header-shop">
        <h1> <span ><img className="img-star" src={star} alt="" /></span> Offers <span ><img className="img-star" src={star} alt="" /></span></h1>
      </div>
      <div className="view">
        {loading && <p className="load-message">...Loading Data</p>}
        {error && (
          <div className="Error-shop">
            {error}
            <button className="error-button" onClick={handleReload}>Retry again</button>
          </div>
        )}
        {!loading && !error && dataShop.length === 0 && (
          <p className="no-data">No products available</p>
        )}
        {!loading && !error && dataShop.length > 0 && (
          <div className="row p-4 justify-content-between">
            {dataShop.map((product) => (
              <ShoppingCard 
                seller={product.user?.name || "Unknown Seller"}
                key={product._id || product.id}
                id={product._id || product.id}
                title={product.title}
                category={product.category?.name || product.category}
                imageCover={product.imageCover}
                price={product.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shooping;