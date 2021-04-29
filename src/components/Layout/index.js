import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Header from '../Header'

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
      <>
   <Header />

   {props.sidebar ? 
  	<Container fluid>
    <Row>
      <Col md={2} className="sidebar">
        <ul>
          <li class="navLink"><NavLink exact  to={`/`} >Home</NavLink></li>
          <li class="navLink"><NavLink to={`/page`}>Page</NavLink></li>
          <li class="navLink"><NavLink to={`/category`}>Category</NavLink></li>
          <li class="navLink"><NavLink to={`/products`}>Products</NavLink></li>
          <li class="navLink"><NavLink to={`/orders`}>Orders</NavLink></li>
        </ul>
      </Col>
      <Col md={10} style={{marginLeft:'auto', paddingTop: '60px'}}>
        
   {props.children}
      </Col>
    </Row>
  </Container> 
  
  :
  
  props.children

  }



  </>
   )

 }

export default Layout