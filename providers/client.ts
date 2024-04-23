import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
    mutations: {
      retry: false
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const graphqlError = error as any
      error.message = graphqlError?.response?.errors?.[0]?.message ?? ''
    }
  }),
  mutationCache: new MutationCache({
    onError(error) {
      const graphqlError = error as any
      const isClient: boolean = typeof window !== 'undefined'
      const message: string = graphqlError?.response?.errors?.[0]?.message ?? ''

      error.message = message
      if (isClient)
        window.snackbar.open(message, {
          variant: 'default'
        })
    }
  })
})
