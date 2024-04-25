import { forwardRef } from 'react'
import { TextField, TextFieldProps, useForkRef } from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type { Control, FieldError, FieldPath, FieldValues } from 'react-hook-form'

import { useFormError } from '../FormErrorProvider'
import useTransform, { UseTransformOptions } from '../../plugins/useTransform'

export type TextFieldElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<TextFieldProps, 'name'> & {
  validation?: UseControllerProps<TFieldValues, TName>['rules']
  name: TName
  parseError?: (error: FieldError) => ReactNode
  control?: Control<TFieldValues>
  component?: typeof TextField
  transform?: UseTransformOptions<TFieldValues, TName>['transform']
}

type TextFieldElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: TextFieldElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const TextFieldElement = forwardRef(function TextFieldElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: TextFieldElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
  const {
    validation = {},
    parseError,
    type,
    required,
    name,
    control,
    component: TextFieldComponent = TextField,
    inputRef,
    transform,
    ...rest
  } = props

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const rules = {
    ...validation,
    ...(required && !validation.required && { required: 'This field is required' }),
    ...(type === 'email' &&
      !validation.pattern && {
        pattern: {
          value:
            // eslint-disable-next-line no-useless-escape
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Please enter a valid email address'
        }
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
  const { value, onChange } = useTransform({
    value: field.value,
    onChange: field.onChange,
    transform
  })

  const handleInputRef = useForkRef(field.ref, inputRef)

  return (
    <TextFieldComponent
      {...rest}
      name={field.name}
      value={value ?? ''}
      onChange={(ev) => {
        onChange(type === 'number' && ev.target.value ? +ev.target.value : ev.target.value)
        if (typeof rest.onChange === 'function') {
          rest.onChange(ev)
        }
      }}
      onBlur={field.onBlur}
      required={required}
      type={type}
      error={!!error}
      helperText={
        error
          ? typeof customErrorFn === 'function'
            ? customErrorFn(error)
            : error.message
          : rest.helperText
      }
      ref={ref}
      inputRef={handleInputRef}
    />
  )
})

TextFieldElement.displayName = 'TextFieldElement'

export default TextFieldElement as TextFieldElementComponent
