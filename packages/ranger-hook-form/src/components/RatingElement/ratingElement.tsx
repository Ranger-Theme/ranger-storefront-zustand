import { forwardRef } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { FormControl, FormHelperText, FormLabel, Rating } from '@mui/material'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps
} from 'react-hook-form'
import type { FormControlProps, RatingProps } from '@mui/material'

import { useFormError } from '../../providers/FormErrorProvider'

export type RatingElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<RatingProps, 'name'> & {
  name: TName
  control?: Control<TFieldValues>
  label?: string
  rules?: UseControllerProps<TFieldValues, TName>['rules']
  parseError?: (error: FieldError) => ReactNode
  required?: boolean
  formControlProps?: FormControlProps
}

type RatingElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: RatingElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const RatingElement = forwardRef(function RatingElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: RatingElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
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
  const max: number = other?.max ?? 5
  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const requiredMSg: string = 'This field is required'
  const validationRules: UseControllerProps<TFieldValues, TName>['rules'] = {
    ...rules,
    ...(required && {
      validate: (value: number) => {
        return value > 0 || requiredMSg
      }
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
  const form = useFormContext()

  const defaultText =
    typeof customErrorFn === 'function' ? customErrorFn(error as any) : error?.message ?? ''
  const renderHelperText = error ? defaultText : null

  if (field.value > max) {
    form.setValue(name, max as any)
  }

  return (
    <FormControl error={invalid} required={required} fullWidth {...formControlProps} ref={ref}>
      {label && (
        <FormLabel component="legend" error={invalid}>
          {label}
        </FormLabel>
      )}
      <Rating
        {...other}
        max={max}
        value={Number(field.value)}
        onChange={(ev: React.SyntheticEvent<any>, value: number | null) => {
          field.onChange(value)
          if (typeof other.onChange === 'function') {
            other.onChange(ev, value)
          }
        }}
      />
      {renderHelperText && <FormHelperText error={invalid}>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
})

RatingElement.displayName = 'RatingElement'

export default RatingElement as RatingElementComponent
