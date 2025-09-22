import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCarSide, FaUserCircle } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoDocumentTextSharp } from "react-icons/io5";
import './NavBar.css';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/sign');
    window.location.reload();
  };

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  return (
    <>
      <Navbar expand="lg" className="nav px-5 py-2 position-fixed">
        <h1 className='h1-title mb-0 text-white f-bold  '>MotoMall</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Link to="/" className='text-decoration-none my-2 mx-3'><FaHome /> Home</Link>
            <Link to="/shopping" className='text-decoration-none my-2 mx-3'><FaCarSide /> Shopping</Link>
            <Link to="/about" className='text-decoration-none my-2 mx-3'><IoIosInformationCircle /> About</Link>
            <Link to="/contact" className='text-decoration-none my-2 mx-3'><RiContactsBook2Fill /> Contact</Link>

            {!user ? (
              <Link to="/sign" className='text-decoration-none'>
                <Button variant="outline-dark" className="my-2 mx-3">Sign In</Button>
              </Link>
            ) : (
              <div className="user-icon my-2 mx-3" onClick={handleSidebarToggle} style={{ cursor: 'pointer' }}>
                <FaUserCircle size={28} />
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Offcanvas show={showSidebar} onHide={handleSidebarToggle} placement="end" className="custom-sidebar">
        <Offcanvas.Header closeButton className="sidebar-header">
          <Offcanvas.Title className="sidebar-title">Welcome, {user?.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="sidebar-body">
          <div className="user-info">
            <div className="user-avatar">
              <FaUserCircle size={50} />
            </div>
            <h4 className="user-name">{user?.name}</h4>
            <p className="user-email">{user?.email}</p>
          </div>
          
          <ul className="list-unstyled sidebar-menu">
            <li className="menu-item">
              <Button 
                className="sidebar-btn w-100" 
                onClick={() => { navigate('/mypost'); handleSidebarToggle(); }}
              >
                <span className="btn-icon">📄</span>
                <span className="btn-text">My Posts</span>
              </Button>
            </li>
            <li className="menu-item">
              <Button 
                className="sidebar-btn w-100" 
                onClick={() => { navigate('/AddCarForm'); handleSidebarToggle(); }}
              >
                <span className="btn-icon">🚗</span>
                <span className="btn-text">Add Car</span>
              </Button>
            </li>
            <li className="menu-item">
              <Button 
                className="sidebar-btn w-100" 
                onClick={() => { navigate('/profile'); handleSidebarToggle(); }}
              >
                <span className="btn-icon">👤</span>
                <span className="btn-text">Profile</span>
              </Button>
            </li>
            <li className="menu-item">
              <Button 
                className="sidebar-btn w-100 logout-btn" 
                onClick={handleLogout}
              >
                <span className="btn-icon">🔓</span>
                <span className="btn-text">Logout</span>
              </Button>
            </li>
          </ul>
          
          <div className="sidebar-footer">
            <p className="footer-text">MotoMall © 2025</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}