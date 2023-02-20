import { format } from 'date-fns'
import { useCallback, useEffect } from 'react'
import * as EmailValidator from 'email-validator'
import { useRouter } from 'next/router'

import { useSendVcOfferMutation } from 'hooks/issuer/api'
import { ROUTES } from 'utils'

export type SelectOption = {
  value: string,
  label: string
}

export const DosageUnitOptions: SelectOption[] = [
  {
    value: 'mg',
    label: 'mg',
  },
  {
    value: 'g',
    label: 'g',
  },
  {
    value: 'ml',
    label: 'ml',
  },
  {
    value: 'piece',
    label: 'piece',
  },
]

export const FrequencyIntervalUnitOptions: SelectOption[] = [
  {
    value: 'hour',
    label: 'per hour',
  },
  {
    value: 'day',
    label: 'per day',
  },
  {
    value: 'week',
    label: 'per week',
  },
]


export type PrescriptionData = {
  medicationName: string
  prescribedAt: string
  practitionerName: string
  dosageAmount: string
  dosageUnit: string
  frequencyTimes: string
  frequencyIntervalUnit: string
  patientName: string
  patientEmail: string
}

export const initialValues: PrescriptionData = {
  medicationName: '',
  prescribedAt: '',
  practitionerName: '',
  dosageAmount: "1",
  dosageUnit: DosageUnitOptions[0].value,
  frequencyTimes: "1",
  frequencyIntervalUnit: FrequencyIntervalUnitOptions[0].value,
  patientName: '',
  patientEmail: '',
}

export const useCredentialForm = () => {
  const router = useRouter()
  const { mutate, isSuccess, isLoading } = useSendVcOfferMutation()

  const handleSubmit = (values: PrescriptionData) => {
    mutate({
      targetEmail: values.patientEmail,
      credentialSubject: {
        prescribedAt: format(new Date(values.prescribedAt), "yyyy-MM-dd"),
        medicationName: values.medicationName,
        dosage: {
          amount: Number(values.dosageAmount),
          unit: values.dosageUnit
        },
        practitioner: {
          name: values.practitionerName,
        },
        frequency: {
          amount: Number(values.frequencyTimes),
          interval: {
            amount: 1,
            unit: values.frequencyIntervalUnit
          }
        },
        patient: {
          name: values.patientName,
          email: values.patientEmail,
        }
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      router.push(ROUTES.issuer.result)
    }
  }, [isSuccess, router])

  const validate = useCallback((values: PrescriptionData) => {
    const errors = {} as Partial<PrescriptionData>

    if (!values.medicationName) {
      errors.medicationName = 'Mandatory field'
    }

    if (!values.prescribedAt) {
      errors.prescribedAt = 'Mandatory field'
    }

    if (!values.practitionerName) {
      errors.practitionerName = 'Mandatory field'
    }

    if (!values.dosageAmount) {
      errors.dosageAmount = 'Mandatory field'
    }

    if (!values.dosageUnit) {
      errors.dosageUnit = 'Mandatory field'
    }

    if (!values.frequencyIntervalUnit) {
      errors.frequencyIntervalUnit = 'Mandatory field'
    }

    if (!values.frequencyTimes) {
      errors.frequencyTimes = 'Mandatory field'
    }

    if (!values.patientName) {
      errors.patientName = 'Mandatory field'
    }

    if (!values.patientEmail) {
      errors.patientEmail = 'Mandatory field'
    } else if (!EmailValidator.validate(values.patientEmail)) {
      errors.patientEmail = 'Invalid email'
    }

    return errors
  }, [])

  return {
    handleSubmit,
    validate,
    isCreating: isLoading,
  }
}
