import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home.jsx'
import About from './Pages/About/About.jsx'
import { Route, Routes } from 'react-router-dom';
import Shooping from './Pages/Shooping/Shooping.jsx'
import Contact from './Pages/Contact/Contact.jsx';
import Sign from './Pages/Sign/Sign.jsx';
import AddCarForm from './components/AddCarForm/AddCarForm.jsx';
import CarDetails from './components/CarDetails/CarDetails.jsx';
import MyPost from './components/MyPost/MyPost.jsx';
import EditProduct from './components/EditProduct/EditProduct.jsx';
import Profile from './components/Profile/Profile.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shopping' element={<Shooping />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/AddCarForm' element={<AddCarForm />} />
        <Route path='/shopping/carDetails/:id' element={<CarDetails />} />
        <Route path='/mypost' element={<MyPost />} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
        <Route path='/profile' element={<Profile />} />



      </Routes>
    </>
  )
}

export default App
