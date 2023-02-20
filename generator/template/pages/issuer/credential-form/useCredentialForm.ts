import { useCallback, useEffect, useState } from 'react'
import * as EmailValidator from 'email-validator'
import { useRouter } from 'next/router'

import { useSendVcOfferMutation } from 'hooks/issuer/api'
import { ROUTES } from 'utils'

export type VcData = {
  firstName: string
  lastName: string
  targetEmail: string
}

export const initialValues: VcData = {
  firstName: '',
  lastName: '',
  targetEmail: '',
}

export const useCredentialForm = () => {
  const router = useRouter()
  const { mutate, isSuccess, isLoading } = useSendVcOfferMutation()
  const [error, setError] = useState(null)

  const handleSubmit = (values: VcData) => {
    mutate({
      targetEmail: values.targetEmail,
      credentialSubject: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      router.push(ROUTES.issuer.result)
    }
  }, [isSuccess, router])

  const validate = useCallback((values: VcData) => {
    const errors = {} as Partial<VcData>

    if (!values.firstName) {
      errors.firstName = 'Mandatory field'
    }

    if (!values.lastName) {
      errors.lastName = 'Mandatory field'
    }

    if (!values.targetEmail) {
      errors.targetEmail = 'Mandatory field'
    } else if (!EmailValidator.validate(values.targetEmail)) {
      errors.targetEmail = 'Invalid email'
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
