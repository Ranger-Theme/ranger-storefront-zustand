import { useEffect } from 'react'
import { CheckboxElement, useFormContext } from '@ranger-theme/react-hook-form'

const AgreeTerms = () => {
  const form = useFormContext()

  useEffect(() => {
    form.setValue('agreen', false)
  }, [])

  return (
    <div>
      <CheckboxElement name="agreen" label="Agree the conditions" required />
    </div>
  )
}

export default AgreeTerms
