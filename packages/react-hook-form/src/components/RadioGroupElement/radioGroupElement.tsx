import { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme
} from '@mui/material'
import type { ChangeEvent, ReactNode, Ref, RefAttributes } from 'react'
import type { Control, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import type { FormControlLabelProps, FormLabelProps } from '@mui/material'

import { useFormError } from '../FormErrorProvider'

export type RadioGroupElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  options: { label: string; id: string | number }[] | any[]
  helperText?: ReactNode
  name: TName
  required?: boolean
  parseError?: (error: FieldError) => ReactNode
  label?: string
  labelKey?: string
  valueKey?: string
  disabledKey?: string
  type?: 'number' | 'string'
  emptyOptionLabel?: string
  onChange?: (value: any) => void
  returnObject?: boolean
  row?: boolean
  control?: Control<TFieldValues>
  labelProps?: Omit<FormControlLabelProps, 'label' | 'control' | 'value'>
  formLabelProps?: Omit<FormLabelProps, 'required' | 'error'>
  disabled?: boolean
}

type RadioGroupElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: RadioGroupElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const RadioGroupElement = forwardRef(function RadioGroupElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: RadioGroupElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
  const {
    helperText,
    options,
    label,
    name,
    parseError,
    labelKey = 'label',
    valueKey = 'id',
    disabledKey = 'disabled',
    required,
    emptyOptionLabel,
    returnObject,
    row,
    control,
    type,
    labelProps,
    disabled,
    formLabelProps,
    ...rest
  } = props
  const theme = useTheme()

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    rules: required ? { required: 'This field is required' } : undefined,
    disabled,
    control
  })

  const renderHelperText = error
    ? typeof customErrorFn === 'function'
      ? customErrorFn(error)
      : error.message
    : helperText

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = type === 'number' ? Number(event.target.value) : event.target.value
    const returnValue = returnObject
      ? options.find((items) => items[valueKey] === radioValue)
      : radioValue
    field.onChange(returnValue)
    if (typeof rest.onChange === 'function') {
      rest.onChange(returnValue)
    }
  }

  return (
    <FormControl error={!!error} ref={ref}>
      {label && (
        <FormLabel {...formLabelProps} required={required} error={!!error}>
          {label}
        </FormLabel>
      )}
      <RadioGroup onChange={onRadioChange} name={name} row={row} value={field.value || ''}>
        {emptyOptionLabel && (
          <FormControlLabel
            {...labelProps}
            control={
              <Radio
                sx={{
                  color: error ? theme.palette.error.main : undefined
                }}
                checked={!field.value}
              />
            }
            label={emptyOptionLabel}
            value=""
          />
        )}
        {options.map((option: any) => {
          const optionKey = option[valueKey]
          const optionDisabled = option[disabledKey] || false
          if (optionKey === undefined) {
            console.error(
              `RadioGroupElement: valueKey ${valueKey} does not exist on option`,
              option
            )
          }
          let val = returnObject ? field.value?.[valueKey] : field.value
          if (type === 'number') {
            val = Number(val)
          }
          const isChecked = val === optionKey
          return (
            <FormControlLabel
              {...labelProps}
              control={
                <Radio
                  sx={{
                    color: error ? theme.palette.error.main : undefined
                  }}
                  disabled={disabled || optionDisabled}
                  checked={isChecked}
                />
              }
              value={optionKey}
              label={option[labelKey]}
              key={optionKey}
            />
          )
        })}
      </RadioGroup>
      {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
})

RadioGroupElement.displayName = 'RadioGroupElement'

export default RadioGroupElement as RadioGroupElementComponent
