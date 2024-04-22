import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      throwOnError(error) {
        const graphqlError = error as any
        error.message = graphqlError?.response?.errors?.[0]?.message ?? ''
        console.log(error)
        return true
      }
    },
    mutations: {
      onError(error) {
        const graphqlError = error as any
        error.message = graphqlError?.response?.errors?.[0]?.message ?? ''
      }
    }
  }
})
