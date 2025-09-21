import { useNavigate } from "react-router-dom"
import './Addcar.css'
const AddCar = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/AddCarForm')
    }
  return (
    <div className="button-container">
        <button onClick={handleNavigate} className="Add-Button">Add Car</button>
      
    </div>
  )
}

export default AddCar
