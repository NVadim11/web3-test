# Web3 Wallet TEST

Web3 test application for working with Ethereum wallet.

## Demo

**Live version:** [https://web3-test-six.vercel.app/](https://web3-test-six.vercel.app/)

## Environment Variables

Create `.env` file in the root directory:

```env
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key
VITE_SEPOLIA_ETHERSCAN_URL=https://api-sepolia.etherscan.io/api
VITE_MAINNET_ETHERSCAN_URL=https://api.etherscan.io/api
```

**Note:** Etherscan API key is required for fetching transaction history. Get your free API key at [etherscan.io](https://etherscan.io/apis).

## Installation and Setup

```bash
# Clone repository
git clone <repository-url>
cd web3-test

# Install dependencies
npm install

# Start dev server
npm run dev
```

Application will be available at: `http://localhost:5173`

## Build

```bash
npm run build
```
