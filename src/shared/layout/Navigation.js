import React from "react";
import { Col, Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const navigation = (props) => {
  return (
    <Col md={12}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/product-category-list">
              Product Category
            </Link>
            <Link className="nav-link" to="/product-list">
              Product
            </Link>
          </Nav>

          <Form inline>
            <Button variant="light" onClick={props.onLogout}>
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Col>
  );
};

export default navigation;
