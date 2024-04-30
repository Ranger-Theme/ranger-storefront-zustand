import { forwardRef } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { FormControl, FormHelperText, FormLabel } from '@mui/material'
import { UploadFile, DeleteForever } from '@mui/icons-material'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps
} from 'react-hook-form'
import type { DropzoneOptions } from 'react-dropzone'
import type { FormControlProps } from '@mui/material'

import { useFormError } from '../../providers/FormErrorProvider'

export type FileUploadElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<DropzoneOptions, 'validator'> & {
  name: TName
  control?: Control<TFieldValues>
  label?: string
  rules?: UseControllerProps<TFieldValues, TName>['rules']
  parseError?: (error: FieldError) => ReactNode
  required?: boolean
  formControlProps?: FormControlProps
}

type FileUploadElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FileUploadElementProps<TFieldValues, TName> & RefAttributes<HTMLDivElement>
) => JSX.Element

const FileUploadElement = forwardRef(function UploadElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FileUploadElementProps<TFieldValues, TName>, ref: Ref<HTMLDivElement>): JSX.Element {
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
  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const validationRules: UseControllerProps<TFieldValues, TName>['rules'] = {
    ...rules,
    ...(required &&
      !rules.required && {
        required: 'This field is required'
      })
  }

  const { setValue } = useFormContext()
  const {
    field,
    fieldState: { error, invalid }
  } = useController({
    name,
    control,
    disabled: other.disabled,
    rules: validationRules
  })

  const defaultText =
    typeof customErrorFn === 'function' ? customErrorFn(error as any) : error?.message ?? ''
  const renderHelperText = error ? defaultText : null
  const files: File[] = field.value || []

  const onDrop = (droppedFiles: File[], fileRejections: any[], event: any) => {
    setValue(name, droppedFiles as any, { shouldValidate: true })
    if (other?.onDrop) {
      other?.onDrop(droppedFiles, fileRejections, event)
    }
  }

  const onRemove = (key: number) => {
    const filteredFiles = files.filter((__, index) => index !== key)
    setValue(name, filteredFiles as any, { shouldValidate: true })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ ...other, onDrop })

  return (
    <FormControl error={invalid} required={required} fullWidth {...formControlProps} ref={ref}>
      {label && (
        <FormLabel component="legend" error={invalid}>
          {label}
        </FormLabel>
      )}
      <div
        {...getRootProps({
          className: 'dropzone w-100 fs-20 d-flex align-items-center'
        })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <span className="fs-16">Drop the files here ... </span>
        ) : (
          <span className="fs-16">
            <UploadFile />
          </span>
        )}
      </div>
      {!!files?.length && (
        <div className="grid gap-1 grid-cols-4 mt-2">
          {files.map((file: File, key: number) => {
            return (
              <div key={file.name}>
                <picture>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ width: '100px', height: '100px' }}
                  />
                </picture>
                <p>
                  {file.name} - {(file.size / 1024, 2).toFixed(2)}kb
                </p>
                <DeleteForever onClick={() => onRemove(key)} />
              </div>
            )
          })}
        </div>
      )}
      {renderHelperText && <FormHelperText error={invalid}>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
})

FileUploadElement.displayName = 'FileUploadElement'

export default FileUploadElement as FileUploadElementComponent
