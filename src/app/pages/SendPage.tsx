import { Transaction } from '@features'
import { useAccount } from 'wagmi'

export function SendPage() {
  const { address } = useAccount()

  if (!address) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Please connect MetaMask wallet to send tokens</p>
        </div>
      </div>
    )
  }

  return (
      <Transaction />
  )
}
