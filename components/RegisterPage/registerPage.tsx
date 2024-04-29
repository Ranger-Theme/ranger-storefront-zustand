import { Button, Stack } from '@mui/material'
import { format } from 'date-fns'
import {
  FormElement,
  CheckboxGroupElement,
  TextFieldElement,
  PasswordElement,
  MultiSelectElement,
  RadioGroupElement,
  DatePickerElement,
  DateFnsProvider,
  DateTimePickerElement,
  SelectElement,
  TextareaElement,
  TimePickerElement,
  SliderElement,
  useForm
} from '@ranger-theme/react-hook-form'

type FormValues = {
  account: {
    email: string
    name: string
    password: string
    label: string[]
    multiple: string[]
    inline: string
    date: Date
    time_picker: Date
    choose: string
    comment: ''
    time: Date
    slider: number
  }
}

const RegisterPage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      account: {
        email: '',
        name: '',
        password: '',
        label: [],
        multiple: [],
        inline: '',
        date: undefined,
        time_picker: undefined,
        choose: '',
        comment: '',
        time: undefined,
        slider: 10
      }
    }
  })

  const handleOnSuccess = (values: FormValues) => {
    console.info(format(values.account.date, 'yyyy-MM-dd'))
  }

  return (
    <div className="grid">
      <p>Register Page</p>
      <FormElement formContext={form} onSuccess={handleOnSuccess}>
        <DateFnsProvider>
          <Stack>
            <TextFieldElement type="email" name="account.email" label="Email" required />
            <TextFieldElement name="account.name" label="User Name" required />
            <PasswordElement name="account.password" label="Password" required />
            <TextareaElement name="account.comment" label="Required Textarea" rows={5} required />
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
            <MultiSelectElement
              name="account.multiple"
              label="Multiple"
              options={[
                'Oliver Hansen',
                'Van Henry',
                'April Tucker',
                'Ralph Hubbard',
                'Omar Alexander',
                'Carlos Abbott',
                'Miriam Wagner',
                'Bradley Wilkerson',
                'Virginia Andrews',
                'Kelly Snyder'
              ]}
              required
            />
            <RadioGroupElement
              name="account.inline"
              label="Required"
              row
              required
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
            <SelectElement
              label="Required"
              name="choose"
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
              required
            />
            <SliderElement name="account.slider" label="Required Label" required />
            <DatePickerElement
              label="Required Picker"
              name="account.date"
              required
              validation={{
                required: 'Custom required message'
              }}
            />
            <DateTimePickerElement
              label="Datetime Picker"
              name="account.time_picker"
              required
              validation={{
                required: 'Custom required message'
              }}
            />
            <TimePickerElement
              label="Time Picker"
              name="account.time"
              required
              validation={{
                required: 'Custom required message'
              }}
            />
            <Button type="submit" color="primary">
              <span>Submit</span>
            </Button>
          </Stack>
        </DateFnsProvider>
      </FormElement>
    </div>
  )
}

export default RegisterPage
