# About

We believe in future where learning and play are united.

We want to provide players financial opportunities to mitigate unforeseen problems such as poverty and inequality. And above all, imagine a future where gaming can change the world.

Our project's mission is to create a playful and user-friendly way for the general public to understand and adopt block-chain technology. 
Our project uses NFT racehorses as a tool to entertain and learn for the future of gaming and virtual reality.

![alt text](public/MuntyEco.png)

# Legendary Marketplace

### Trade Legendary items for cryptocurrency on the in-game and web Marketplace.

Join the community and dive into a world of endless possibilities.

![alt text](public/nftmarketplace.png)

# Getting Started

### Requirements
- OS: `Mac`, `Linux`, `Windows`
- Node.js v20+
- Chrome + Postman/curl for demoing the API

### Install dependencies
```bash
npm install --legacy-peer-deps
```
> This installs the full React + Express + Hardhat toolchain along with `web3`, `ethers`, and the Ajv v6 packages required by `react-scripts`.

### Helpful scripts
- `npm run hardhat:compile` – Compile Solidity contracts
- `npm run hardhat:node` – Start the Hardhat dev chain on `http://127.0.0.1:8555`
- `npm run hardhat:deploy` – Deploy `Voting.sol` to the running local chain
- `npm start` – Launch Express (port 4000) + React dev server (port 3000) via `concurrently`

---

## Local Voting Stack Walkthrough

1. **Start Hardhat node (Terminal #1)**
   ```bash
   npm run hardhat:node
   ```
   You’ll see the funded test accounts and private keys printed (keep this terminal running).

2. **Deploy the Voting contract (Terminal #2)**
   ```bash
   npm run hardhat:deploy
   ```
   Note:
   - `Voting contract deployed to: <address>` → `VOTING_CONTRACT_ADDRESS`
   - Deployer account (`0xf39F…`) uses private key `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

3. **Configure `.env` (project root)**
   ```
   HARDHAT_RPC_URL=http://127.0.0.1:8555
   VOTING_CONTRACT_ADDRESS=<address from step 2>
   VOTING_OWNER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
   Restart any running backend after editing this file.

4. **Boot the app (Terminal #3)**
   ```bash
   npm start
   ```
   - Express API: `http://localhost:4000`
   - React dev server (proxy): `http://localhost:3000`

5. **Exercise the Voting API (port 4000)**
   ```bash
   # Add candidate (owner-only, automatically signed via env key)
   curl -X POST http://localhost:4000/api/v1/voting/candidates ^
        -H "Content-Type: application/json" ^
        -d "{\"name\":\"Alice\"}"

   # List
   curl http://localhost:4000/api/v1/voting/candidates

   # Vote (any other Hardhat account)
   curl -X POST http://localhost:4000/api/v1/voting/vote ^
        -H "Content-Type: application/json" ^
        -d "{\"account\":\"0x70997970C51812dc3A010C7d01b50e0d17dc79C8\",\"candidateIndex\":0}"

   # Winner
   curl http://localhost:4000/api/v1/voting/winner
   ```

6. **Record the video demo**
   - Show terminals: Hardhat node, deployment logs, `npm start`
   - Capture Postman/curl calls for each endpoint
   - Mention contract artifacts: `blockchain/contracts/Voting.sol` and ABI at `blockchain/artifacts/contracts/Voting.sol/Voting.json`

---

### Notes
- `Voting.sol` enforces owner-only candidate creation, single vote per address, and exposes `getCandidates`/`getWinner`.
- `server/services/votingService.js` initializes `web3` with the env values and signs owner transactions automatically.
- All blockchain interactions flow through the Express API mounted at `/api/v1/voting/*`.