import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { transactionApi } from '../api/transactionApi'
import { TRANSACTION_LIST_CONSTANTS } from './constants'
import { useState, useMemo } from 'react'

export type TransactionFilter = 'all' | 'sent' | 'received'

export function useTransactions() {
  const { address } = useAccount()
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: allTransactions = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['transactions', address],
    queryFn: () => transactionApi.fetchTransactionsFromBothNetworks(address!),
    enabled: !!address,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds
  })

  const displayedTransactions = useMemo(() => {
    const endIndex = currentPage * TRANSACTION_LIST_CONSTANTS.ITEMS_PER_PAGE
    return allTransactions.slice(0, endIndex)
  }, [allTransactions, currentPage])

  const hasMore = useMemo(() => {
    const endIndex = currentPage * TRANSACTION_LIST_CONSTANTS.ITEMS_PER_PAGE
    return endIndex < allTransactions.length
  }, [allTransactions.length, currentPage])

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const reset = () => {
    setCurrentPage(1)
  }

  return {
    transactions: displayedTransactions,
    allTransactions,
    isLoading,
    error: error?.message || null,
    hasMore,
    currentPage,
    loadMore,
    refetch,
    reset
  }
}
