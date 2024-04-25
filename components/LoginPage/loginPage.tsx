import Link from 'next/link'
import { Button, Stack } from '@mui/material'
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm
} from '@ranger-theme/react-hook-form'

import AgreeTerms from '@/components/AgreeTerms'

type FormValues = {
  name: string
  password: string
  agreen: boolean
}

const LoginPage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      password: '',
      agreen: true
    }
  })

  const handleOnSuccess = (values: FormValues) => {
    console.info(values)
  }

  return (
    <div>
      <h3>Login Form</h3>
      <FormContainer formContext={form} onSuccess={handleOnSuccess}>
        <Stack>
          <TextFieldElement name="name" label="User Name" required />
          <PasswordElement name="password" label="Password" required />
          <AgreeTerms />
          <Button type="submit" color="primary">
            <span>Submit</span>
          </Button>
        </Stack>
      </FormContainer>
      <Link href="/register">
        <span>Create An Account</span>
      </Link>
    </div>
  )
}

export default LoginPage
