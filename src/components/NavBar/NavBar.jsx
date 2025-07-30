import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import './NavBar.css'
export default function NavBar() {
    return (


        <Navbar expand="lg" className="nav px-5 py-2 position-fixed">
            <h1 href="#home" className=' h1-title mb-0 text-dark'>MotoMall</h1>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto d-flex align-items-center">
                    <Link to={"/"} className='text-decoration-none my-2 mx-3'><FaHome />Home</Link>
                    <Link to={"/buying"} className='text-decoration-none my-2 mx-3'><FaCarSide />Buying</Link>
                    <Link to={"/rental"} className='text-decoration-none my-2 mx-3'><IoDocumentTextSharp />Rental</Link>
                    <Link to={"/about"} className='text-decoration-none my-2 mx-3'> <IoIosInformationCircle />About Us</Link>
                    <Link to={"/contact"} className='text-decoration-none my-2  mx-3'><RiContactsBook2Fill />Contact</Link>
                    <Link to={"/sign"} className='text-decoration-none'><Button variant="outline-dark my-2 mx-3">Sign In</Button></Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}
