import { useAccount } from 'wagmi'
import { Connect, Account, Balance } from '@features'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from '@routes/routes'

export function Header() {
  const { isConnected } = useAccount()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const isTransactionActive = location.pathname === '/' || location.pathname === '/send'

  return (
    <header className="bg-gray-800/50 border-b border-purple-500/30 px-6 py-4 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">Web3 Test</h1>
        
        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              <Balance />
              <Account />
            </>
          ) : (
            <Connect />
          )}
          
          <div className="md:hidden">
              <button
                className="p-2 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div className="w-5 h-0.5 bg-white mb-1"></div>
                <div className="w-5 h-0.5 bg-white mb-1"></div>
                <div className="w-5 h-0.5 bg-white"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isMobileMenuOpen} 
        onOpenChange={setIsMobileMenuOpen}
        hideCloseButton={true}
        classNames={{
          base: "bg-gray-900 m-0 rounded-none animate-in zoom-in-95 duration-300 fixed inset-0 w-screen h-screen z-50 !mx-0 !my-0 !max-w-none",
          backdrop: "bg-black/80 animate-in fade-in duration-300 fixed inset-0 z-40",
          wrapper: "fixed inset-0 z-50 p-0 m-0 !mx-0 !my-0",
          body: "p-0 m-0",
          header: "p-0 m-0",
          footer: "p-0 m-0"
        }}
      >
        <ModalContent className="h-screen w-screen flex flex-col animate-in slide-in-from-bottom-4 duration-300 relative m-0 p-0">
          <ModalHeader className="flex justify-end items-center px-6 py-4 animate-in slide-in-from-top-2 duration-300 delay-100">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </ModalHeader>
          
          <ModalBody className="flex flex-col items-center justify-center py-20 flex-1 animate-in fade-in duration-300 delay-200 px-6 w-full">
            <div className="space-y-6 w-full">
              <NavLink
                to={ROUTES.SEND}
                className={`block w-full text-center py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isTransactionActive
                    ? 'text-white bg-purple-600/50 border border-purple-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/30 border border-gray-600/30'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Send Tokens
              </NavLink>
              
              <NavLink
                to={ROUTES.HISTORY}
                className={`block w-full text-center py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === ROUTES.HISTORY
                    ? 'text-white bg-purple-600/50 border border-purple-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-purple-500/30 border border-gray-600/30'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Transaction History
              </NavLink>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </header>
  )
}
