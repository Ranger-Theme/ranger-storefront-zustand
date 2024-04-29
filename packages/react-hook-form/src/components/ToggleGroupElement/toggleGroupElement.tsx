import { useController } from 'react-hook-form'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import type { ReactNode } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  UseControllerProps,
  FieldValues
} from 'react-hook-form'
import type { FormLabelProps, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material'

import { useFormError } from '../../providers/FormErrorProvider'

type SingleToggleButtonProps = Omit<ToggleButtonProps, 'value' | 'children'> & {
  id: number | string
  label: ReactNode
}

export type ToggleGroupElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ToggleButtonGroupProps & {
  required?: boolean
  label?: string
  validation?: UseControllerProps<TFieldValues, TName>['rules']
  name: TName
  parseError?: (error: FieldError) => ReactNode
  control?: Control<TFieldValues>
  options: SingleToggleButtonProps[]
  formLabelProps?: FormLabelProps
  helperText?: string
  enforceAtLeastOneSelected?: boolean
}

export default function ToggleGroupElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ToggleGroupElementProps<TFieldValues, TName>) {
  const {
    name,
    control,
    label,
    validation = {},
    required,
    options = [],
    parseError,
    helperText,
    formLabelProps,
    enforceAtLeastOneSelected = false,
    exclusive,
    ...toggleButtonGroupProps
  } = props
  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const rules = {
    ...validation,
    ...(required &&
      !validation.required && {
        validation: 'This field is required'
      })
  }

  const isRequired = required || !!validation?.required

  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    disabled: toggleButtonGroupProps.disabled
  })

  const defaultText =
    typeof customErrorFn === 'function' ? customErrorFn(error as any) : error?.message ?? ''
  const renderHelperText = error ? defaultText : helperText

  return (
    <FormControl
      error={!!error}
      required={isRequired}
      fullWidth={toggleButtonGroupProps?.fullWidth}>
      {label && (
        <FormLabel
          {...formLabelProps}
          error={!!error}
          required={isRequired}
          sx={{ mb: 1, ...formLabelProps?.sx }}>
          {label}
        </FormLabel>
      )}
      <ToggleButtonGroup
        {...toggleButtonGroupProps}
        exclusive={exclusive}
        value={field.value}
        onBlur={field.onBlur}
        onChange={(event, val) => {
          if (enforceAtLeastOneSelected) {
            // don't allow unselecting the last item
            if (exclusive && val === null) return
            if (!exclusive && val.length === 0) return
          }
          field.onChange(val)
          if (typeof toggleButtonGroupProps.onChange === 'function') {
            toggleButtonGroupProps.onChange(event, val)
          }
        }}>
        {options.map(({ label: optionLabel, id, ...toggleProps }) => (
          <ToggleButton value={id} {...toggleProps} key={id}>
            {optionLabel}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
}
