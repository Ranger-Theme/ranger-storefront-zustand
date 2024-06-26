import { forwardRef, useState } from 'react'
import { useController } from 'react-hook-form'
import { useForkRef } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useLocalizationContext, validateDateTime } from '@mui/x-date-pickers/internals'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  PathValue,
  FieldValues,
  UseControllerProps
} from 'react-hook-form'
import type { TextFieldProps } from '@mui/material'
import type {
  DateTimePickerProps,
  DateTimePickerSlotsComponentsProps
} from '@mui/x-date-pickers/DateTimePicker'

import { useFormError } from '../../providers/FormErrorProvider'
import { defaultErrorMessages } from '../../messages/dateTimePicker'

export type DateTimePickerElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TDate = PathValue<TFieldValues, TName>
> = Omit<DateTimePickerProps<TDate>, 'value' | 'slotProps'> & {
  name: TName
  required?: boolean
  isDate?: boolean
  parseError?: (error: FieldError) => ReactNode
  validation?: UseControllerProps<TFieldValues, TName>['rules']
  control?: Control<TFieldValues>
  inputProps?: TextFieldProps
  helperText?: TextFieldProps['helperText']
  textReadOnly?: boolean
  slotProps?: Omit<DateTimePickerSlotsComponentsProps<TDate>, 'textField'>
  overwriteErrorMessages?: typeof defaultErrorMessages
}

type DateTimePickerElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: DateTimePickerElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const DateTimePickerElement = forwardRef(function DateTimePickerElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: DateTimePickerElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
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

        const internalError = validateDateTime({
          props: {
            shouldDisableDate: rest.shouldDisableDate,
            shouldDisableMonth: rest.shouldDisableMonth,
            shouldDisableYear: rest.shouldDisableYear,
            disablePast: Boolean(rest.disablePast),
            disableFuture: Boolean(rest.disableFuture),
            minDate: rest.minDate,
            maxDate: rest.maxDate,
            timezone: rest.timezone ?? inputTimezone ?? 'default',
            disableIgnoringDatePartForTimeValidation: rest.disableIgnoringDatePartForTimeValidation,
            maxTime: rest.maxTime,
            minTime: rest.minTime,
            minutesStep: rest.minutesStep,
            shouldDisableTime: rest.shouldDisableTime
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
    rules,
    control,
    disabled: rest.disabled,
    defaultValue: null as any
  })

  const handleInputRef = useForkRef(field.ref, inputRef)
  const defaultText =
    typeof customErrorFn === 'function' ? customErrorFn(error as any) : error?.message ?? ''
  const parsedHelperText = error ? defaultText : inputProps?.helperText || rest.helperText

  if (field?.value && typeof field?.value === 'string') {
    field.value = new Date(field.value) as any // need to see if this works for all localization adaptors
  }

  return (
    <DateTimePicker
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
          error: !!error,
          helperText: parsedHelperText,
          inputProps: {
            readOnly: textReadOnly,
            ...inputProps?.inputProps
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

DateTimePickerElement.displayName = 'DateTimePickerElement'

export default DateTimePickerElement as DateTimePickerElementComponent
