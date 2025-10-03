export interface EtherscanTransaction {
  blockNumber: string
  timeStamp: string
  hash: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  gasUsed: string
  isError: string
  txreceipt_status: string
}

export interface Transaction {
  hash: string
  from: string
  to: string
  amount: string
  status: 'pending' | 'success' | 'fail'
  timestamp: number
  blockNumber: string
  gasUsed: string
  chainId: number
}

