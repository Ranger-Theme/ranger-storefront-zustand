import { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import { FormControl, FormHelperText, FormLabel, Slider } from '@mui/material'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps
} from 'react-hook-form'
import type { FormControlProps, SliderProps } from '@mui/material'

import { useFormError } from '../../providers/FormErrorProvider'

export type SliderElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<SliderProps, 'control'> & {
  name: TName
  control?: Control<TFieldValues>
  label?: string
  rules?: UseControllerProps<TFieldValues, TName>['rules']
  parseError?: (error: FieldError) => ReactNode
  required?: boolean
  formControlProps?: FormControlProps
}

type SliderElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: SliderElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const SliderElement = forwardRef(function SliderElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: SliderElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
  const {
    name,
    control,
    label,
    rules = {},
    parseError,
    required,
    formControlProps,
    ...other
  } = props

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const validationRules = {
    ...rules,
    ...(required &&
      !rules.required && {
        required: 'This field is required'
      })
  }

  const {
    field,
    fieldState: { error, invalid }
  } = useController({
    name,
    control,
    disabled: other.disabled,
    rules: validationRules
  })

  const defaultText =
    typeof customErrorFn === 'function' ? customErrorFn(error as any) : error?.message ?? ''
  const renderHelperText = error ? defaultText : null

  return (
    <FormControl error={invalid} required={required} fullWidth {...formControlProps} ref={ref}>
      {label && (
        <FormLabel component="legend" error={invalid}>
          {label}
        </FormLabel>
      )}
      <Slider
        {...other}
        value={field.value}
        onChange={field.onChange}
        valueLabelDisplay={other.valueLabelDisplay || 'auto'}
      />
      {renderHelperText && <FormHelperText error={invalid}>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
})

SliderElement.displayName = 'SliderElement'

export default SliderElement as SliderElementComponent
