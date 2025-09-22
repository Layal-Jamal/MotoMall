import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle, FaMapMarkerAlt, FaCar, FaPhone, FaArrowLeft } from 'react-icons/fa';
import img44 from '../../assets/images/honda.jfif'
import './CarDetails.css'

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/v1/products/${id}`);

                if (!response.data) {
                    throw new Error("The Product is not found");
                }

                const carData = response.data.data.product || response.data;
                setCar(carData);
                console.log(response);

            } catch (err) {
                if (err.response) {
                    setError(`Something is wrong in server : ${err.response.status}`);
                } else if (err.request) {
                    setError('Unable to connect to server')
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchCar();

    }, [id])
    
    // دالة للعودة إلى الصفحة السابقة
    const handleGoBack = () => {
        navigate(-1);
    }

    if (loading) {
        return <div className="load-div">Loading .....</div>
    }
    if (error) {
        return <div className="error-div">Error : {error}</div>
    }
    return (
        <div className="car-details-container">
            
            <button className="back-button" onClick={handleGoBack}>
                <FaArrowLeft /> Back
            </button>
            
            <div className="car-details">
                <div className="header-details">
                    <span>{car.user.name.toUpperCase()}</span>
                    <FaUserCircle />
                </div>
                <div className="car-image">
                    <img src={car.imageCover} alt="" />
                </div>
                <div className="car-location">
                    <FaMapMarkerAlt />
                    <span className="car-category">{car.category?.name.toUpperCase() || car.category}</span>
                </div>
                <div className="car-info">
                    <div className="car-model-view">
                        <FaCar />
                        <span className="car-model">{car.title}</span>
                    </div>
                    <div className="description-car">
                        <p>{car.description}</p>
                    </div>
                    <div className="contact-price-details">
                        <strong className="price">{car.price}$</strong>
                        <div className="contact-details">
                            <FaPhone />
                            <strong className="phone-number">{car.user.phone}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails