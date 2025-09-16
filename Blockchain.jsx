import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

function Blockchain() {
  const [chain, setChain] = useState([]);

  const addBlock = () => {
    const newBlock = {
      id: chain.length + 1,
      data: `Tourist Verified at ${new Date().toLocaleTimeString()}`
    };
    setChain([...chain, newBlock]);
  };

  return (
    <div>
      <h4>Blockchain ID Verification</h4>
      <Button onClick={addBlock} className="mb-3">Add Block</Button>
      <ListGroup>
        {chain.map((block) => (
          <ListGroup.Item key={block.id}>
            ⛓ Block #{block.id}: {block.data}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Blockchain;
