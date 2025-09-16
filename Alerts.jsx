
import React from "react";
import { Alert } from "react-bootstrap";

function Alerts() {
  return (
    <>
      <Alert variant="success">✅ All systems normal.</Alert>
      <Alert variant="warning">⚠️ Tourist entered restricted area.</Alert>
      <Alert variant="danger">🚨 Incident detected! Authorities notified.</Alert>
    </>
  );
}

export default Alerts;
