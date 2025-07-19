# 🗳️ Zama FHE Voting dApp

This is a decentralized voting application built on top of the FHEVM (Fully Homomorphic Encryption Virtual Machine) from Zama. It allows users to cast encrypted YES/NO votes onchain while preserving vote confidentiality.

## 💡 Features

- Vote privately (YES or NO)
- Encrypted values stored onchain
- Nobody, not even the contract owner, can see how you voted
- Results are aggregated in encrypted form

## 🛠️ Project Structure

```
voting-app/
├── backend/             # Express.js server for encryption
├── frontend/            # React UI using Vite
├── contracts/           # Solidity smart contract (PrivateVoting)
├── scripts/             # Deployment script using Hardhat
├── hardhat.config.ts    # Hardhat config
└── README.md            # You are here
```

## 🧩 Technologies

- Solidity + Hardhat + TypeChain
- Vite + React + Ethers.js v6
- Zama FHEVM SDK (`fhevmjs`)
- Node.js backend using `tsx` and `express`

---

## ⚙️ Setup Instructions

### 1. Clone and install dependencies

```bash
git clone <this-project> voting-app
cd voting-app
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2. Compile the contract

```bash
cd voting-app
npx hardhat compile
```

### 3. Deploy the contract (Sepolia or other FHE-compatible network)

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

Copy the deployed address into `frontend/.env` like so:

```env
VITE_CONTRACT_ADDRESS=0xYourDeployedAddress
VITE_BACKEND_URL=http://your-server-ip:3001
```

---

## 🚀 Running the dApp

### Start the backend server:

```bash
cd backend
npm start
```

You should see:

```
🔐 Zama FHE Voting backend is live 🟢
🌐 Listening on http://0.0.0.0:3001/vote
```

### Start the frontend:

```bash
cd frontend
npm run dev -- --host 0.0.0.0 --port 5173
```

Then open in your browser:

```
http://<your-server-ip>:5173/
```

---

## 🔐 How FHE Voting Works

- The frontend sends a `1` (YES) or `0` (NO) to the backend.
- The backend encrypts the vote using Zama's FHEVM SDK and returns the encrypted bytes32.
- The encrypted vote is submitted to the smart contract.
- The contract keeps an encrypted tally of YES and NO votes.

> 💡 No votes are ever stored in plain text. The system is 100% confidential.

---

## 📦 Build Notes

- Frontend uses `fhevmjs` (custom compiled, browser-only version).
- No `node-tfhe` or `node-tkms` are used in frontend – they are excluded from build.
- Only `dist/browser.js` is used from fhevmjs.
- `.wasm` files are included via `vite.config.ts` using `assetsInclude`.

---

## 🧪 Sample Voting Flow

1. Click ✅ Vote YES or ❌ Vote NO
2. MetaMask popup will appear — confirm the transaction.
3. The encrypted vote is recorded onchain.
4. UI displays confirmation + encrypted tallies (YES/NO).

---
