import { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  FormHelperText,
  useForkRef
} from '@mui/material'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps
} from 'react-hook-form'

import { useFormError } from '../../providers/FormErrorProvider'

export type CheckboxElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<CheckboxProps, 'name'> & {
  validation?: UseControllerProps<TFieldValues, TName>['rules']
  name: TName
  parseError?: (error: FieldError) => ReactNode
  label?: FormControlLabelProps['label']
  helperText?: string
  control?: Control<TFieldValues>
  labelProps?: Omit<FormControlLabelProps, 'label' | 'control'>
}

type CheckboxElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: CheckboxElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const CheckboxElement = forwardRef(function CheckboxElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: CheckboxElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
  const {
    name,
    validation = {},
    required,
    parseError,
    label,
    control,
    helperText,
    labelProps,
    inputRef,
    ...rest
  } = props

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const rules = {
    ...validation,
    ...(required &&
      !validation.required && {
        required: 'This field is required'
      })
  }

  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    disabled: rest.disabled,
    rules
  })

  const handleInputRef = useForkRef(field.ref, inputRef)

  const defaultText =
    typeof customErrorFn === 'function' ? customErrorFn(error as any) : error?.message ?? ''
  const renderHelperText = error ? defaultText : helperText

  return (
    <FormControl required={required} error={!!error} ref={ref}>
      <FormGroup row>
        <FormControlLabel
          {...labelProps}
          label={label || ''}
          control={
            <Checkbox
              {...rest}
              color={rest.color || 'primary'}
              sx={[
                ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
                {
                  color: error ? 'error.main' : undefined
                }
              ]}
              value={field.value}
              checked={!!field.value}
              onChange={(ev) => {
                field.onChange(!field.value)
                if (typeof rest.onChange === 'function') {
                  rest.onChange(ev, !field.value)
                }
              }}
              inputRef={handleInputRef}
            />
          }
        />
      </FormGroup>
      {renderHelperText && <FormHelperText error={!!error}>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
})

CheckboxElement.displayName = 'CheckboxElement'

export default CheckboxElement as CheckboxElementComponent
