import { useState, useEffect } from 'react'
import { useSendTransaction, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { parseEther, isAddress } from 'viem'
import { toast } from 'react-toastify'
import { Button, Input } from '@heroui/react'
import { TRANSACTION_LIST_CONSTANTS } from '@entities/transactionList'

export function Transaction() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const { chainId } = useAccount()

  const { sendTransaction, data: hash, isPending, error } = useSendTransaction()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (hash && isConfirming) {
      toast.info('Pending...')
      if ((window as any).addTransaction) {
        (window as any).addTransaction({
          hash,
          to,
          amount,
          status: 'pending'
        })
      }
    }
  }, [hash, isConfirming, to, amount])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Success!')
      setTo('')
      setAmount('')
      if (hash && (window as any).updateTransactionStatus) {
        (window as any).updateTransactionStatus(hash, 'success')
      }
    }
  }, [isSuccess, hash])

  useEffect(() => {
    if (error) {
      const isUserRejected = error.message?.includes('User rejected') || 
                            error.message?.includes('rejected') ||
                            error.message?.includes('denied')
      
      const errorMessage = isUserRejected ? 'User rejected the transaction' : `Error: ${error.message}`
      toast.error(errorMessage)
      
      if (hash && (window as any).updateTransactionStatus) {
        (window as any).updateTransactionStatus(hash, 'fail')
      }
    }
  }, [error, hash])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    sendTransaction({
      to: to as `0x${string}`,
      value: parseEther(amount),
    })
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    if (value.match(/^0+[1-9]/)) {
      value = '0.' + value.replace(/^0+/, '')
    }
    
    setAmount(value)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && !isFormDisabled) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const validAddress = isAddress(to)
  const validAmount = parseFloat(amount) > 0
  const isValid = validAddress && validAmount
  
  const isFormDisabled = isPending || isConfirming

  if (chainId !== TRANSACTION_LIST_CONSTANTS.SEPOLIA_CHAIN_ID && chainId !== 1) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg">Please connect to Sepolia testnet or Ethereum mainnet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-sm sm:max-w-md">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 text-center">Send Tokens</h3>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <Input
          label="Recipient Address"
          value={to}
          onChange={handleToChange}
          onKeyPress={handleKeyPress}
          placeholder="0x..."
          disabled={isFormDisabled}
          variant="bordered"
          color="secondary"
          isInvalid={to !== '' && !validAddress}
          errorMessage={to !== '' && !validAddress ? "Invalid address" : ""}
          classNames={{
            base: "w-full",
            mainWrapper: "h-full",
            input: "text-white bg-gray-800/50 border border-purple-500/30 hover:border-purple-400/50 focus:border-purple-400 rounded-md px-3 py-2 text-sm sm:text-base min-h-[44px]",
            inputWrapper: "bg-transparent border-none shadow-none p-0",
            label: "text-gray-300 mb-2 text-sm sm:text-base",
            errorMessage: "text-red-400 text-xs mt-1 block !h-auto !min-h-[20px]",
            helperWrapper: "!h-auto !min-h-[20px] !flex"
          }}
        />
        
        <Input
          label="Amount (ETH)"
          type="number"
          step="0.001"
          value={amount}
          onChange={handleAmountChange}
          onKeyPress={handleKeyPress}
          placeholder="0.01"
          disabled={isFormDisabled}
          variant="bordered"
          color="secondary"
          isInvalid={amount !== '' && !validAmount}
          errorMessage={amount !== '' && !validAmount ? "Invalid amount" : ""}
          classNames={{
            base: "w-full",
            mainWrapper: "h-full",
            input: "text-white bg-gray-800/50 border border-purple-500/30 hover:border-purple-400/50 focus:border-purple-400 rounded-md px-3 py-2 text-sm sm:text-base min-h-[44px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            inputWrapper: "bg-transparent border-none shadow-none p-0",
            label: "text-gray-300 mb-2 text-sm sm:text-base",
            errorMessage: "text-red-400 text-xs mt-1 block !h-auto !min-h-[20px]",
            helperWrapper: "!h-auto !min-h-[20px] !flex"
          }}
        />
        
        <Button 
          type="submit" 
          disabled={!isValid || isPending || isConfirming}
          color="primary"
          variant="solid"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 relative overflow-hidden [&_.nextui-ripple]:hidden [&_.nextui-button]:bg-transparent [&_.nextui-button]:shadow-none px-6 py-3 text-sm sm:text-base min-h-[48px]"
        >
          {isPending ? 'Sending...' : 
           isConfirming ? 'Confirming...' : 
           'Send'}
        </Button>
        </form>
      </div>
    </div>
  )
}
