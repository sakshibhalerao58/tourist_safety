// simple local blockchain simulator (not real crypto) — for demo only
import { v4 as uuidv4 } from "uuid";

export function createGenesis() {
  return [{ index: 0, timestamp: Date.now(), data: "GENESIS", prevHash: "0", hash: "genesis-hash" }];
}

export function addBlock(chain, data) {
  const prev = chain[chain.length - 1];
  const newBlock = {
    index: prev.index + 1,
    timestamp: Date.now(),
    data,
    prevHash: prev.hash,
    // fake hash: uuid + timestamp (enough for demo tamper evidence)
    hash: uuidv4() + "-" + Date.now().toString(36)
  };
  return [...chain, newBlock];
}

// create "blockchain ID" for a user
export function createBlockchainId(name, email) {
  // deterministic-ish id for demo (uuid is simpler)
  return "ID-" + uuidv4().slice(0, 10);
}
