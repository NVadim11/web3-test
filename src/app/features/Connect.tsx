import { useConnect } from 'wagmi'
import { Button } from '@heroui/react'

export function Connect() {
  const { connectors, connect } = useConnect()

  // metamask only
  const metaMaskConnectors = connectors.filter(connector => 
    connector.name.toLowerCase().includes('metamask')
  )

  return metaMaskConnectors.map((connector) => (
    <Button 
      key={connector.uid} 
      onClick={() => connect({ connector })}
      color="primary"
      variant="solid"
      className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 relative overflow-hidden [&_.nextui-ripple]:hidden [&_.nextui-button]:bg-transparent [&_.nextui-button]:shadow-none"
    >
      Connect MetaMask
    </Button>
  ))
}