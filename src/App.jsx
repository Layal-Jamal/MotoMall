import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home.jsx'
import About from './Pages/About/About.jsx'
import { Route, Routes } from 'react-router-dom';
import Buying from './Pages/Buying/Buying.jsx';
import Rental from './Pages/Rental/Rental.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import Sign from './Pages/Sign/Sign.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/buying' element={<Buying />} />
        <Route path='/rental' element={<Rental />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sign' element={<Sign />} />

      </Routes>
    </>
  )
}

export default App
