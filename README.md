# TokeDex

Full-stack Ethereum dApp scaffold with:

- **Smart contracts** using Hardhat 3 (beta) + Ignition
- **TypeScript tests** with `mocha` + `chai` + `ethers`
- **Solidity tests** compatible with Foundry
- **React + Vite + TypeScript** frontend, pre-wired with `ethers` and `wagmi` dependencies for future integration


---

## Tech Stack

### Smart Contracts (`/contracts`)
- **Solidity** `^0.8.28`
- **Hardhat 3** (beta)
- **Hardhat Ignition** for deployments
- **@nomicfoundation/hardhat-toolbox**
- **Foundry-style Solidity tests** via `forge-std/Test.sol`
- **TypeScript tests** using:
  - `mocha`
  - `chai`
  - `ethers`

### Frontend (`/frontend`)
- **React** `^19`
- **Vite** `^7`
- **TypeScript**
- **React DOM** `^19`
- **wagmi** `^3`
- **ethers** `^6`

---

## Project Structure

```text
TokeDex-main/
├── .gitignore
├── LICENSE
├── README.md              # (this file)
├── contracts/             # Hardhat 3 smart-contract project
│   ├── .gitignore
│   ├── README.md          # Hardhat sample README
│   ├── hardhat.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── contracts/
│   │   ├── Counter.sol           # Sample Counter contract
│   │   └── Counter.t.sol         # Foundry-style Solidity tests
│   ├── test/
│   │   └── Counter.ts            # TypeScript tests for Counter
│   ├── ignition/
│   │   └── modules/
│   │       └── Counter.ts        # Ignition deployment module
│   └── scripts/
│       └── send-op-tx.ts         # Example OP L2 transaction script
└── frontend/              # Vite + React + TS app
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.ts
    ├── tsconfig*.json
    └── src/
        ├── main.tsx
        ├── App.tsx               # Vite starter counter UI
        ├── App.css
        ├── index.css
        └── assets/
            └── react.svg

```

## 1. Clone Repository
```bash
git clone <repo-url>
cd TokeDex
```
##2.Smart Contracts
```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test test/Counter.ts
npx hardhat test contracts/Counter.t.sol
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
npx hardhat run scripts/send-op-tx.ts
```
##3.Frontend 
```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
```







