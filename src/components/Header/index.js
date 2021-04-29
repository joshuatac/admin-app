import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import {signout} from "../../actions";




/**
* @author
* @function Header
**/

const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    
dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
      <span className="nav-link logout" onClick={logout}> <div className="logout">Logout</div> </span>
    </Nav>

    );
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
      <NavLink to="/login" className="nav-link">Login</NavLink>
      <NavLink to="/register" className="nav-link">Register</NavLink>
    </Nav>

    );
  }
  return(
<>
<Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" className="headerBack" variant="dark" style={{zIndex: 1}} >
    <Container fluid>
    <Link to="/" className="navbar-brand">Admin Dashboard</Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
    </Navbar.Collapse>
    </Container>
  </Navbar>

</>


   )

 }

export default Header