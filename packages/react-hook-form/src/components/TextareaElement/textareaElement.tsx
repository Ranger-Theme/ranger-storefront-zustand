import { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import { TextareaAutosize, TextField, useForkRef } from '@mui/material'
import type { CSSProperties, ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps
} from 'react-hook-form'
import type { TextFieldProps } from '@mui/material'

import { useFormError } from '../FormErrorProvider'

export type TextareaElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<TextFieldProps, 'name' | 'type'> & {
  validation?: UseControllerProps<TFieldValues, TName>['rules']
  name: TName
  parseError?: (error: FieldError) => ReactNode
  control?: Control<TFieldValues>
  resizeStyle?: CSSProperties['resize']
}

type TextareaElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: TextareaElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const TextareaElement = forwardRef(function TextareaElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: TextareaElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
  const {
    validation = {},
    parseError,
    required,
    name,
    control,
    rows,
    resizeStyle,
    inputRef,
    inputProps,
    ...rest
  } = props

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const rules = {
    ...validation,
    ...(required && !validation.required && { required: 'This field is required' })
  }

  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    disabled: rest.disabled
  })

  const handleInputRef = useForkRef(field.ref, inputRef)

  return (
    <TextField
      {...rest}
      name={name}
      value={field.value ?? ''}
      onChange={(ev) => {
        field.onChange(ev.target.value)
        if (typeof rest.onChange === 'function') {
          rest.onChange(ev)
        }
      }}
      onBlur={field.onBlur}
      required={required}
      error={!!error}
      helperText={
        error
          ? typeof customErrorFn === 'function'
            ? customErrorFn(error)
            : error.message
          : rest.helperText
      }
      inputRef={handleInputRef}
      multiline
      InputProps={{
        inputComponent: TextareaAutosize,
        inputProps: {
          minRows: rows,
          style: {
            resize: resizeStyle || 'both'
          },
          ...(inputProps || {})
        }
      }}
      ref={ref}
    />
  )
})

TextareaElement.displayName = 'TextareaElement'

export default TextareaElement as TextareaElementComponent
