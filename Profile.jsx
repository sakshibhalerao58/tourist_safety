import React from "react";
import { Card } from "react-bootstrap";

function Profile() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Tourist Profile</Card.Title>
        <Card.Text>
          <strong>Name:</strong> John Doe <br />
          <strong>ID:</strong> T-10293 <br />
          <strong>Location:</strong> Mumbai <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Profile;
