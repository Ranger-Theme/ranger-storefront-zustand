import { forwardRef, useState } from 'react'
import { useController } from 'react-hook-form'
import { useForkRef } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useLocalizationContext, validateDate } from '@mui/x-date-pickers/internals'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  UseControllerProps
} from 'react-hook-form'
import type { TextFieldProps } from '@mui/material'
import type {
  DatePickerProps,
  DatePickerSlotsComponentsProps
} from '@mui/x-date-pickers/DatePicker'
import type { DateValidationError } from '@mui/x-date-pickers'

import { useFormError } from '../../providers/FormErrorProvider'
import { defaultErrorMessages } from '../../messages/datePicker'

export type DatePickerElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TDate = PathValue<TFieldValues, TName>
> = Omit<DatePickerProps<TDate>, 'value' | 'slotProps'> & {
  name: TName
  required?: boolean
  isDate?: boolean
  parseError?: (error: FieldError | DateValidationError) => ReactNode
  validation?: UseControllerProps<TFieldValues, TName>['rules']
  control?: Control<TFieldValues>
  inputProps?: TextFieldProps
  helperText?: TextFieldProps['helperText']
  textReadOnly?: boolean
  slotProps?: Omit<DatePickerSlotsComponentsProps<TDate>, 'textField'>
  overwriteErrorMessages?: typeof defaultErrorMessages
}

type DatePickerElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: DatePickerElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const DatePickerElement = forwardRef(function DatePickerElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: DatePickerElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
  const {
    parseError,
    name,
    required,
    validation = {},
    inputProps,
    control,
    textReadOnly,
    slotProps,
    overwriteErrorMessages,
    inputRef,
    ...rest
  } = props

  const adapter = useLocalizationContext()
  const [open, setOpen] = useState<boolean>(false)

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const errorMessages = {
    ...defaultErrorMessages,
    ...overwriteErrorMessages
  }

  const rules = {
    ...validation,
    ...(required &&
      !validation.required && {
        required: 'This field is required'
      }),
    validate: {
      internal: (value: any) => {
        const inputTimezone =
          value == null || !adapter.utils.isValid(value) ? null : adapter.utils.getTimezone(value)

        const internalError = validateDate({
          props: {
            shouldDisableDate: rest.shouldDisableDate,
            shouldDisableMonth: rest.shouldDisableMonth,
            shouldDisableYear: rest.shouldDisableYear,
            disablePast: Boolean(rest.disablePast),
            disableFuture: Boolean(rest.disableFuture),
            minDate: rest.minDate,
            maxDate: rest.maxDate,
            timezone: rest.timezone ?? inputTimezone ?? 'default'
          },
          value,
          adapter
        })
        return internalError == null || errorMessages[internalError]
      },
      ...validation.validate
    }
  }

  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    disabled: rest.disabled,
    defaultValue: null as any
  })

  const handleInputRef = useForkRef(field.ref, inputRef)

  const errorMessage =
    typeof customErrorFn === 'function' ? customErrorFn(error as any) : error?.message ?? ''
  const renderHelperText = error ? errorMessage : inputProps?.helperText || rest.helperText

  if (field?.value && typeof field?.value === 'string') {
    field.value = new Date(field.value) as any // need to see if this works for all localization adaptors
  }

  return (
    <DatePicker
      {...rest}
      {...field}
      open={open}
      ref={ref}
      inputRef={handleInputRef}
      onClose={(...args) => {
        field.onBlur()
        if (rest.onClose) {
          rest.onClose(...args)
        }
        setOpen(false)
      }}
      onChange={(v, keyboardInputValue) => {
        field.onChange(v, keyboardInputValue)
        if (typeof rest.onChange === 'function') {
          rest.onChange(v, keyboardInputValue)
        }
      }}
      slotProps={{
        ...slotProps,
        textField: {
          ...inputProps,
          required,
          error: !!errorMessage,
          helperText: renderHelperText,
          inputProps: {
            readOnly: !!textReadOnly,
            ...inputProps?.inputProps
          },
          onBlur: (event) => {
            field.onBlur()
            if (typeof inputProps?.onBlur === 'function') {
              inputProps.onBlur(event)
            }
          },
          onClick: (event) => {
            if (typeof inputProps?.onClick === 'function') {
              inputProps.onClick(event)
            }
            setOpen(true)
          }
        }
      }}
    />
  )
})

DatePickerElement.displayName = 'DatePickerElement'

export default DatePickerElement as DatePickerElementComponent
