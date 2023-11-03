import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/Auth/AuthContext"

export default function Header() {
  let location = useLocation();
  let navigate = useNavigate()

  const { admin } = useContext(AuthContext)

  const classes = 'fw-semibold text-white nav-link';

  //Logout
  const logout = () => {
    localStorage.removeItem('token')
    navigate(0)
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary fixed" fixed="top">
        <Container>
        <Navbar.Brand><Link to="/" className={classes}>Consultants 365</Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Link to="/" className={location.pathname === '/' ? classes + " fw-semibold text-white": classes + " opacity-75" }>Home</Link>
              <Link to="/users" className={location.pathname === '/users' ? classes + " fw-semibold text-white": classes + " opacity-75" }>Users</Link>
              <Link to="/conversations" className={location.pathname === '/conversations' ? classes + " fw-semibold text-white": classes + " opacity-75" }>Conversations</Link>
            </Nav>
            <div className='d-flex gap-3 align-items-center justify-content-between'>
              <div className='text-white d-flex gap-2 align-items-center'>
                <img src={admin?.picture} alt={admin?.name} className='rounded-circle' style={{width: "40px"}}/>
                {admin?.name}
              </div>
              <button className={'btn btn-primary'} onClick={logout}>Logout</button>
            </div>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
