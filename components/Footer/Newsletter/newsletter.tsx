import { useMutation, useIsMutating } from '@tanstack/react-query'
import { request } from 'graphql-request'

import { POST_NEWSLETTER } from '@/graphql/postNewsletter'

const useSubscribe = async (email: string) =>
  await request<
    {
      status: string
    },
    {
      email: string
    }
  >('http://127.0.0.1:3000/api/graphql', POST_NEWSLETTER, {
    email
  })

const Newsletter = () => {
  const isMutating = useIsMutating({ mutationKey: ['postNewsletter'] })
  const { mutateAsync } = useMutation({
    mutationKey: ['postNewsletter'],
    mutationFn: ({ email }: { email: string }) => useSubscribe(email)
  })

  const handleSubscribe = async () => {
    try {
      const values = await mutateAsync({ email: '454451659@qq.com' })
      console.info(values)
    } catch (error: any) {
      console.info(error.message)
    }
  }

  return (
    <div>
      <p>Newsletter</p>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  )
}

export default Newsletter
