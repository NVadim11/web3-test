import { TRANSACTION_LIST_CONSTANTS } from '../model/constants'
import type { Transaction, EtherscanTransaction } from '../model/types'

export const transactionApi = {

  async fetchTransactionsFromBothNetworks(address: string): Promise<Transaction[]> {
    const fetchTransactions = async (chainId: number): Promise<Transaction[]> => {
      const baseUrl = chainId === TRANSACTION_LIST_CONSTANTS.MAINNET_CHAIN_ID 
        ? TRANSACTION_LIST_CONSTANTS.MAINNET_ETHERSCAN_URL 
        : TRANSACTION_LIST_CONSTANTS.SEPOLIA_ETHERSCAN_URL

      const url = TRANSACTION_LIST_CONSTANTS.ETHERSCAN_API_KEY
        ? `${baseUrl}?module=account&action=txlist&address=${address}&startblock=${TRANSACTION_LIST_CONSTANTS.DEFAULT_START_BLOCK}&endblock=${TRANSACTION_LIST_CONSTANTS.DEFAULT_END_BLOCK}&page=${TRANSACTION_LIST_CONSTANTS.DEFAULT_PAGE}&offset=${TRANSACTION_LIST_CONSTANTS.DEFAULT_OFFSET}&sort=${TRANSACTION_LIST_CONSTANTS.SORT_ORDER}&apikey=${TRANSACTION_LIST_CONSTANTS.ETHERSCAN_API_KEY}`
        : `${baseUrl}?module=account&action=txlist&address=${address}&startblock=${TRANSACTION_LIST_CONSTANTS.DEFAULT_START_BLOCK}&endblock=${TRANSACTION_LIST_CONSTANTS.DEFAULT_END_BLOCK}&page=${TRANSACTION_LIST_CONSTANTS.DEFAULT_PAGE}&offset=${TRANSACTION_LIST_CONSTANTS.DEFAULT_OFFSET}&sort=${TRANSACTION_LIST_CONSTANTS.SORT_ORDER}`

      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()

      if (data.status === '1' && data.result) {
        return data.result.map((tx: EtherscanTransaction) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          amount: (parseInt(tx.value) / TRANSACTION_LIST_CONSTANTS.WEI_TO_ETH_DIVISOR).toString(),
          status: tx.isError === TRANSACTION_LIST_CONSTANTS.ERROR_STATUS || tx.txreceipt_status === TRANSACTION_LIST_CONSTANTS.SUCCESS_TX_STATUS ? 'fail' : 'success',
          timestamp: parseInt(tx.timeStamp) * TRANSACTION_LIST_CONSTANTS.TIMESTAMP_MULTIPLIER,
          blockNumber: tx.blockNumber,
          gasUsed: tx.gasUsed,
          chainId
        }))
      } else {
        throw new Error(data.message || 'Failed to fetch transactions')
      }
    }

    const [sepoliaTx, mainnetTx] = await Promise.allSettled([
      fetchTransactions(TRANSACTION_LIST_CONSTANTS.SEPOLIA_CHAIN_ID),
      fetchTransactions(TRANSACTION_LIST_CONSTANTS.MAINNET_CHAIN_ID)
    ])

    const allTransactions: Transaction[] = []
    
    if (sepoliaTx.status === 'fulfilled') {
      allTransactions.push(...sepoliaTx.value)
    }
    
    if (mainnetTx.status === 'fulfilled') {
      allTransactions.push(...mainnetTx.value)
    }

    return allTransactions.sort((a, b) => b.timestamp - a.timestamp)
  }
}
