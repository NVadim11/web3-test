export const TRANSACTION_LIST_CONSTANTS = {
  ITEMS_PER_PAGE: 5,
  
  // API
  ETHERSCAN_API_KEY: import.meta.env.VITE_ETHERSCAN_API_KEY!,
  SEPOLIA_ETHERSCAN_URL: import.meta.env.VITE_SEPOLIA_ETHERSCAN_URL!,
  MAINNET_ETHERSCAN_URL: import.meta.env.VITE_MAINNET_ETHERSCAN_URL || 'https://api.etherscan.io/api',
  
  // Chain
  SEPOLIA_CHAIN_ID: 11155111,
  MAINNET_CHAIN_ID: 1,
  
  // Etherscan API parameters
  DEFAULT_START_BLOCK: '0',
  DEFAULT_END_BLOCK: '99999999',
  DEFAULT_PAGE: '1',
  DEFAULT_OFFSET: '100',
  SORT_ORDER: 'desc',
  
  // Status values
  ERROR_STATUS: '1',
  SUCCESS_TX_STATUS: '0',
  
  // Wei conversion
  WEI_TO_ETH_DIVISOR: 1e18,
  TIMESTAMP_MULTIPLIER: 1000,
} as const;
