import { useAccount, useDisconnect } from 'wagmi'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from '@heroui/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const [isOpen, setIsOpen] = useState(false)

  const handleDisconnect = () => {
    disconnect()
    setIsOpen(false)
  }

  const handleAddressClick = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success('Address copied to clipboard!')
      setIsOpen(false)
    }
  }

  return (
    <Dropdown 
      isOpen={isOpen} 
      onOpenChange={setIsOpen}
      placement="bottom"
      offset={15}
    >
      <DropdownTrigger>
        <button className="p-1 rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {address?.slice(2, 4).toUpperCase()}
          </div>
        </button>
      </DropdownTrigger>
      
      <DropdownMenu 
        aria-label="Account actions"
        className="bg-gray-800 border border-purple-500/30 min-w-[250px]"
      >
        <DropdownSection>
          <DropdownItem 
            key="address" 
            className="text-white font-mono text-base font-medium cursor-pointer hover:bg-gray-700/50 transition-colors duration-200 [&]:border-none hover:[&]:border-none text-center py-3"
            onPress={handleAddressClick}
          >
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </DropdownItem>
        </DropdownSection>
        
        <DropdownSection className="pt-2">
          <DropdownItem 
            key="disconnect" 
            className="p-0"
            isReadOnly
          >
            <Button
              onClick={handleDisconnect}
              size="md"
              variant="light"
              className="w-full text-red-400 hover:text-red-300 bg-transparent hover:bg-red-500/10 rounded-lg transition-colors duration-200 relative overflow-hidden [&_.nextui-ripple]:hidden [&_.nextui-button]:bg-transparent [&_.nextui-button]:shadow-none [&_.nextui-button]:border-none hover:[&_.nextui-button]:border-none px-4 py-2"
            >
              Disconnect
            </Button>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}