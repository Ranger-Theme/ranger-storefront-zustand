import { forwardRef } from 'react'
import { useController } from 'react-hook-form'
import { FormControlLabel, Switch, useForkRef } from '@mui/material'
import type { Ref, RefAttributes } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { FormControlLabelProps, SwitchProps } from '@mui/material'

export type SwitchElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<FormControlLabelProps, 'control'> & {
  name: TName
  control?: Control<TFieldValues>
  switchProps?: SwitchProps
}

type SwitchElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: SwitchElementProps<TFieldValues, TName> & RefAttributes<HTMLLabelElement>
) => JSX.Element

const SwitchElement = forwardRef(function SwitchElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: SwitchElementProps<TFieldValues, TName>, ref: Ref<HTMLLabelElement>): JSX.Element {
  const { name, control, switchProps, ...rest } = props

  const { field } = useController({
    name,
    control,
    disabled: rest.disabled
  })

  const handleSwitchRef = useForkRef(field.ref, switchProps?.ref)

  return (
    <FormControlLabel
      ref={ref}
      control={
        <Switch
          {...switchProps}
          name={field.name}
          value={field.value}
          onChange={(event, checked) => {
            field.onChange(event, checked)
            if (typeof switchProps?.onChange === 'function') {
              switchProps.onChange(event, checked)
            }
          }}
          onBlur={(event) => {
            field.onBlur()
            if (typeof switchProps?.onBlur === 'function') {
              switchProps?.onBlur(event)
            }
          }}
          ref={handleSwitchRef}
          checked={!!field.value}
        />
      }
      {...rest}
    />
  )
})

SwitchElement.displayName = 'SwitchElement'

export default SwitchElement as SwitchElementComponent
