import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@mui/material'

import { POST_NEWSLETTER } from '@/graphql/postNewsletter'
import { createClient } from '@/api'

const useSubscribe = async (email: string, locale: string) => {
  const client = createClient(locale)
  await client.request<
    {
      status: string
    },
    {
      email: string
    }
  >(POST_NEWSLETTER, {
    email
  })
}

const Newsletter = () => {
  const router = useRouter()
  const locale: string = router.locale === router.defaultLocale ? '' : `${router.locale}/`
  const { mutateAsync } = useMutation({
    mutationKey: ['postNewsletter'],
    mutationFn: ({ email }: { email: string }) => useSubscribe(email, locale)
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
      <Button color="primary" onClick={handleSubscribe}>
        Subscribe
      </Button>
    </div>
  )
}

export default Newsletter
