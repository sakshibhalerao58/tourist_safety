// src/utils/BlockchainUtility.js
// Simulate Blockchain ID using SHA-like random hash
export function createBlockchainId(name) {
  const time = new Date().getTime();
  const randomHash = btoa(name + "-" + time + "-" + Math.random()).substring(0, 12);
  return `BCID-${randomHash}`;
}
