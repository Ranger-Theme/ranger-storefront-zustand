import Link from 'next/link'
import { Button, Stack } from '@mui/material'
import {
  FormElement,
  PasswordElement,
  TextFieldElement,
  RatingElement,
  FileUploadElement,
  useForm
} from '@ranger-theme/react-hook-form'

import AgreeTerms from '@/components/AgreeTerms'

type FormValues = {
  name: string
  password: string
  agreen: boolean
  rating: number
  files: any
}

const LoginPage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      password: '',
      agreen: true,
      rating: 0,
      files: null
    }
  })

  const handleOnSuccess = (values: FormValues) => {
    console.info(values)
  }

  return (
    <div>
      <h3>Login Form</h3>
      <FormElement formContext={form} onSuccess={handleOnSuccess}>
        <Stack>
          <TextFieldElement name="name" label="User Name" required />
          <PasswordElement name="password" label="Password" required />
          <RatingElement name="rating" label="Rating" required />
          <FileUploadElement name="files" label="Upload Files" required multiple />
          <AgreeTerms />
          <Button type="submit" color="primary">
            <span>Submit</span>
          </Button>
        </Stack>
      </FormElement>
      <Link href="/register">
        <span>Create An Account</span>
      </Link>
    </div>
  )
}

export default LoginPage
