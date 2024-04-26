import { Button, Stack } from '@mui/material'
import {
  FormElement,
  CheckboxGroupElement,
  TextFieldElement,
  PasswordElement,
  useForm
} from '@ranger-theme/react-hook-form'

type FormValues = {
  account: {
    email: string
    name: string
    password: string
    label: string[]
  }
}

const RegisterPage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      account: {
        email: '',
        name: '',
        password: '',
        label: []
      }
    }
  })

  const handleOnSuccess = (values: FormValues) => {
    console.info(values)
  }

  return (
    <div>
      <p>Register Page</p>
      <FormElement formContext={form} onSuccess={handleOnSuccess}>
        <Stack>
          <TextFieldElement type="email" name="account.email" label="Email" required />
          <TextFieldElement name="account.name" label="User Name" required />
          <PasswordElement name="account.password" label="Password" required />
          <CheckboxGroupElement
            name="account.label"
            label="Label"
            required
            row
            options={[
              {
                id: '1',
                label: 'Label 1'
              },
              {
                id: '2',
                label: 'label 2'
              }
            ]}
          />
          <Button type="submit" color="primary">
            <span>Submit</span>
          </Button>
        </Stack>
      </FormElement>
    </div>
  )
}

export default RegisterPage
