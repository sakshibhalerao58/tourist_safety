// src/components/Register.jsx
import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { createBlockchainId } from "../utils/BlockchainUtility";

function Register({ setTourist }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    if (!name) return;
    const blockchainId = createBlockchainId(name);

    // Save in localStorage (simulate blockchain)
    localStorage.setItem("tourist", JSON.stringify({ name, blockchainId }));

    setId(blockchainId);
    setSuccess(true);
    setTourist({ name, blockchainId });
  };

  return (
    <Card style={{ padding: "20px", margin: "20px auto", maxWidth: "500px" }}>
      <h4>📝 Tourist Registration</h4>
      <Form>
        <Form.Group>
          <Form.Label>Tourist Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleRegister} style={{ marginTop: "10px" }}>
          Register with Blockchain ID
        </Button>
      </Form>

      {success && (
        <Alert variant="success" style={{ marginTop: "15px" }}>
          ✅ Registered Successfully! <br />
          <b>Name:</b> {name} <br />
          <b>Blockchain ID:</b> {id}
        </Alert>
      )}
    </Card>
  );
}

export default Register;
