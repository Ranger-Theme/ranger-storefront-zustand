import { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  useTheme
} from '@mui/material'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps
} from 'react-hook-form'
import type { CheckboxProps, FormControlLabelProps } from '@mui/material'

import { useFormError } from '../FormErrorProvider'

export type CheckboxGroupElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  options: { id: string | number; label: string }[] | any[]
  helperText?: ReactNode
  name: TName
  required?: boolean
  parseError?: (error: FieldError) => ReactNode
  label?: string
  labelKey?: string
  valueKey?: string
  onChange?: (data: any) => void
  returnObject?: boolean
  disabled?: boolean
  row?: boolean
  control?: Control<TFieldValues>
  rules?: UseControllerProps<TFieldValues, TName>['rules']
  checkboxColor?: CheckboxProps['color']
  labelProps?: Omit<FormControlLabelProps, 'label' | 'control'>
}

type CheckboxGroupElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: CheckboxGroupElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const CheckboxGroupElement = forwardRef(function CheckboxGroupElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: CheckboxGroupElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
  const {
    helperText,
    options,
    label,
    name,
    parseError,
    required,
    labelKey = 'label',
    valueKey = 'id',
    returnObject,
    disabled,
    row,
    control,
    checkboxColor,
    rules,
    labelProps,
    ...rest
  } = props

  const theme = useTheme()
  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const {
    field: { value = [], onChange },
    fieldState: { error }
  } = useController({
    name,
    rules: required ? { required: 'This field is required' } : rules,
    disabled,
    control
  })

  const renderHelperText = error
    ? typeof customErrorFn === 'function'
      ? customErrorFn(error)
      : error.message
    : helperText

  const handleChange = (index: number | string) => {
    const newArray: (string | number)[] | any[] = [...value]
    const exists =
      value.findIndex((i: any) => (returnObject ? i[valueKey] === index : i === index)) === -1
    if (exists) {
      newArray.push(returnObject ? options.find((i) => i[valueKey] === index) : index)
    } else {
      newArray.splice(
        value.findIndex((i: any) => (returnObject ? i[valueKey] === index : i === index)),
        1
      )
    }

    onChange(newArray)
    if (typeof rest.onChange === 'function') {
      rest.onChange(newArray)
    }
  }

  return (
    <FormControl error={!!error} required={required} ref={ref}>
      {label && <FormLabel error={!!error}>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: any) => {
          const optionKey = option[valueKey]
          if (optionKey === undefined) {
            console.error(
              `CheckboxGroupElement: valueKey ${valueKey} does not exist on option`,
              option
            )
          }
          const isChecked =
            value.findIndex((item: any) =>
              returnObject ? item[valueKey] === optionKey : item === optionKey
            ) !== -1
          return (
            <FormControlLabel
              {...labelProps}
              control={
                <Checkbox
                  sx={{
                    color: error ? theme.palette.error.main : undefined
                  }}
                  color={checkboxColor || 'primary'}
                  value={optionKey}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => handleChange(optionKey)}
                />
              }
              label={option[labelKey]}
              key={optionKey}
            />
          )
        })}
      </FormGroup>
      {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
})

CheckboxGroupElement.displayName = 'CheckboxGroupElement'

export default CheckboxGroupElement as CheckboxGroupElementComponent
