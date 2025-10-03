import { useBalance, useAccount } from 'wagmi'
import { formatEther } from 'viem'

function useEthPrice() {
  return { data: 3500, isLoading: false, error: null }
}

export function Balance() {
  const { address } = useAccount()
  const { data: balance, isLoading, error } = useBalance({
    address: address,
    query: {
      refetchInterval: 2000, 
      refetchIntervalInBackground: true,
    }
  })
  const { data: ethPrice } = useEthPrice()

  if (isLoading) return <div className="text-gray-500">Loading balance...</div>
  if (error) return <div className="text-red-500">Error: {error.message}</div>
  if (!balance) return <div className="text-gray-500">No balance data</div>

  const ethAmount = parseFloat(formatEther(balance.value))
  const usdAmount = ethAmount * ethPrice

  return (
    <div className="text-right">
      <div className="text-xs text-gray-400">Balance</div>
      <div className="text-sm font-medium text-white">ETH: {ethAmount.toFixed(4)}</div>
      <div className="text-sm font-medium text-white">USD: ${usdAmount.toFixed(2)}</div>
    </div>
  )
}