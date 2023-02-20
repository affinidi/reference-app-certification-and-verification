import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import * as EmailValidator from 'email-validator'
import { useRouter } from 'next/router'

import { useSendVcOfferMutation } from 'hooks/issuer/api'
import { ROUTES } from 'utils'


export const adjustForUTCOffset = (date: Date) => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

export type CredentialSubjectData = {
  courseTitle: string
  institution: string
  dateOfCompletion: string
  name: string
  email: string
}

export const initialValues: CredentialSubjectData = {
  courseTitle: '',
  institution: '',
  dateOfCompletion: '',
  name: '',
  email: '',
}

export const useCredentialForm = () => {
  const router = useRouter()
  const { mutate, isSuccess, isLoading, error } = useSendVcOfferMutation()

  const handleSubmit = (values: CredentialSubjectData) => {
    mutate({
      targetEmail: values.email ,
      credentialSubject: {
        dateOfCompletion: format(
          adjustForUTCOffset(new Date(values.dateOfCompletion)),
          'yyyy-MM-dd'
        ),
        courseTitle: values.courseTitle,
        institution: values.institution,
        student: {
          name: values.name,
          email: values.email,
        },
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      router.push(ROUTES.issuer.result)
    }
  }, [isSuccess, router])

  const validate = useCallback((values: CredentialSubjectData) => {
    const errors = {} as Partial<CredentialSubjectData>

    if (!values.courseTitle) {
      errors.courseTitle = 'Mandatory field'
    }

    if (!values.institution) {
      errors.institution = 'Mandatory field'
    }

    if (!values.dateOfCompletion) {
      errors.dateOfCompletion = 'Mandatory field'
    }

    if (!values.name) {
      errors.name = 'Mandatory field'
    }

    if (!values.email) {
      errors.email = 'Mandatory field'
    } else if (!EmailValidator.validate(values.email)) {
      errors.email = 'Invalid email'
    }

    return errors
  }, [])


  return {
    handleSubmit,
    validate,
    error,
    isCreating: isLoading,
  }
}
