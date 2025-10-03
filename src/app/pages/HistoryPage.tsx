import { TransactionList } from '@widgets'
import { useAccount } from 'wagmi'

export function HistoryPage() {
  const { address } = useAccount()

  if (!address) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Please connect MetaMask wallet to view transaction history</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <TransactionList />
    </div>
  )
}
