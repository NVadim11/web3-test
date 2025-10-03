import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { 
  useTransactions,
  TRANSACTION_LIST_CONSTANTS,
  type Transaction
} from '@entities/transactionList'
import { Button } from '@heroui/react'

export function TransactionList() {
  const { address, chainId } = useAccount()
  const { 
    transactions: displayedTransactions, 
    isLoading, 
    error, 
    hasMore, 
    loadMore, 
    refetch,
    reset
  } = useTransactions()

  useEffect(() => {
    if (!address) {
      reset()
    }
  }, [address, reset])

  const handleLoadMore = () => {
    loadMore()
  }

  const handleRefresh = () => {
    refetch()
  }


  if (chainId !== TRANSACTION_LIST_CONSTANTS.SEPOLIA_CHAIN_ID && chainId !== 1) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg">Please connect to Sepolia testnet or Ethereum mainnet</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading transactions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button 
            onClick={handleRefresh}
            color="primary"
            variant="solid"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 relative overflow-hidden [&_.nextui-ripple]:hidden [&_.nextui-button]:bg-transparent [&_.nextui-button]:shadow-none px-6 py-2"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
        <Button 
          onClick={handleRefresh}
          size="sm"
          variant="light"
          color="secondary"
          className="text-purple-400 hover:text-purple-300 bg-transparent hover:bg-purple-500/10 rounded-lg transition-colors duration-200 relative overflow-hidden [&_.nextui-ripple]:hidden [&_.nextui-button]:bg-transparent [&_.nextui-button]:shadow-none"
        >
          Refresh
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {displayedTransactions.length === 0 ? (
        <div className="text-gray-400 italic text-center py-8">
          No transactions found
        </div>
      ) : (
        <div className="space-y-3">
          {displayedTransactions.map((tx: Transaction) => (
            <a
              key={tx.hash}
              href={`${tx.chainId === TRANSACTION_LIST_CONSTANTS.MAINNET_CHAIN_ID ? 'https://etherscan.io' : 'https://sepolia.etherscan.io'}/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-purple-500/30 rounded-lg p-4 bg-gray-800/50 hover:bg-gray-700/50 hover:border-purple-400/50 transition-colors cursor-pointer backdrop-blur-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    tx.from?.toLowerCase() === address?.toLowerCase() 
                      ? 'bg-red-500/20 text-red-300' 
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {tx.from?.toLowerCase() === address?.toLowerCase() ? 'OUT' : 'IN'}
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {tx.chainId === TRANSACTION_LIST_CONSTANTS.MAINNET_CHAIN_ID ? 'Mainnet' : 'Sepolia'}
                  </div>
                </div>
              </div>
              
              <div className="mb-2">
                <strong className="text-gray-300">Hash:</strong> 
                <span className="font-mono text-xs ml-1 text-gray-400">
                  {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                </span>
              </div>
              
              <div className="mb-2">
                <strong className="text-gray-300">Recipient:</strong> 
                <span className="font-mono text-xs ml-1 text-gray-400">
                  {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                </span>
              </div>
              
              <div className="mb-2">
                <strong className="text-gray-300">Amount:</strong> <span className="text-white">{parseFloat(tx.amount).toFixed(4)} ETH</span>
              </div>
              
              <div>
                <strong className="text-gray-300">Status:</strong> 
                <span className={`ml-1 font-bold ${
                  tx.status === 'success' ? 'text-green-400' : 
                  tx.status === 'fail' ? 'text-red-400' : 'text-orange-400'
                }`}>
                  {tx.status === 'success' ? 'Success' : 
                   tx.status === 'fail' ? 'Failed' : 'Pending'}
                </span>
              </div>
            </a>
          ))}
          
          <div className="text-center pt-4">
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleLoadMore()
              }}
              disabled={isLoading || !hasMore}
              color="secondary"
              variant="flat"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 relative overflow-hidden [&_.nextui-ripple]:hidden [&_.nextui-button]:bg-transparent [&_.nextui-button]:shadow-none px-6 py-2"
            >
              {isLoading ? 'Loading...' : hasMore ? 'Show More' : 'All loaded'}
            </Button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
