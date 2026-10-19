import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { FieldControl } from '../FieldControl'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      <FieldControl align="start" invalid={Boolean(errors[name])}>
        <TextAreaComponent
          aria-invalid={Boolean(errors[name])}
          className={errors[name] ? 'pr-12' : undefined}
          defaultValue={defaultValue}
          id={name}
          rows={rows}
          {...register(name, { required: required })}
        />
      </FieldControl>

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
