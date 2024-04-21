import type { FC, ReactNode } from 'react'
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient } from './client'

export interface ApiProviderProps {
  children: ReactNode
  dehydratedState?: any
}

export const ApiProvider: FC<ApiProviderProps> = ({ children, dehydratedState = {} }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
        <ReactQueryDevtools initialIsOpen />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
