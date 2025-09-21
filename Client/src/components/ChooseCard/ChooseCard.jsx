import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChooseCard.css';

const ChooseCard = ({ title, discription, logo}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/AddCarForm');
        } else {
            navigate('/sign');
        }
    };

    return (
        <div className="choose-card">
            <div className='choose-card-image-mobile'>
                <img src={logo} alt={title} />
            </div>
            
            <div className='choose-content'>
                <h1 className='choose-title'>{title}</h1>
                <p className='choose-description'>{discription}</p>
                <button className='choose-button' onClick={handleButtonClick}>
                    Get Started!
                </button>
            </div>
            
            <div className='choose-card-image'>
                <img src={logo} alt={title} />
            </div>
        </div>
    );
}

export default ChooseCard;