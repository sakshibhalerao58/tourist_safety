// src/components/NavigationBar.jsx
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavigationBar({ activePage, setActivePage }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>🛰️ Tourist Safety System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={activePage} onSelect={(key) => setActivePage(key)}>
            <Nav.Link eventKey="map">🌍 Map</Nav.Link>
            <Nav.Link eventKey="alerts">🚨 Alerts</Nav.Link>
            <Nav.Link eventKey="dashboard">📊 Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
