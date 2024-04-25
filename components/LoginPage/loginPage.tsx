import { Button, Stack } from '@mui/material'
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm
} from '@ranger-theme/react-hook-form'

type FormValues = {
  name: string
  password: string
}

const LoginPage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      password: ''
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
          <Button type="submit" color="primary">
            <span>Submit</span>
          </Button>
        </Stack>
      </FormContainer>
    </div>
  )
}

export default LoginPage
