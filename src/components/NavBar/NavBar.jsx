import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './NavBar.css'
export default function NavBar() {
    return (


        <Navbar expand="lg" className="nav px-5 py-2 position-fixed d-flex w-100 justify-content-between align-items-center">
            <h1 href="#home" className='text-white h1-title mb-0'>MotoMall</h1>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto d-flex align-items-center">
                    <Link to={"/"} className='text-decoration-none me-3 my-2 text-white'>Home</Link>
                    <Link to={"/buying"} className='text-decoration-none me-3 my-2 text-white'>Buying</Link>
                    <Link to={"/rental"} className='text-decoration-none me-3 my-2 text-white'>Rental</Link>
                    <Link to={"/about"} className='text-decoration-none me-3 my-2 text-white'>About Us</Link>
                    <Link to={"/contact"} className='text-decoration-none me-3 my-2 text-white'>Contact</Link>
                    <Link to={"/sign"}><Button variant="outline-dark my-2">Sign In</Button></Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}
