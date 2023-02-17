import { format } from 'date-fns'
import { useCallback, useState } from 'react'
import * as EmailValidator from 'email-validator'
import { useRouter } from 'next/router'

import { JSONLD_CONTEXT_URL } from 'utils/schema'
import { ROUTES } from 'utils'
import { apiKeyHash, projectDid, projectId } from 'pages/env'

import { parseSchemaURL } from 'services/issuance/parse.schema.url'
import {
  CreateIssuanceInput,
  CreateIssuanceOfferInput,
  VerificationMethod,
} from 'services/issuance/issuance.api'
import { issuanceService } from 'services/issuance'

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
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = useCallback(
    async (values: CredentialSubjectData) => {
      setIsCreating(true)

      const walletUrl = `${window.location.origin}/holder/claim`
      const { schemaType, jsonSchema, jsonLdContext } =
        parseSchemaURL(JSONLD_CONTEXT_URL)

      const issuanceJson: CreateIssuanceInput = {
        template: {
          walletUrl,
          verification: {
            method: VerificationMethod.Email,
          },
          schema: {
            type: schemaType,
            jsonLdContextUrl: jsonLdContext.toString(),
            jsonSchemaUrl: jsonSchema.toString(),
          },
          issuerDid: projectDid,
        },
        projectId,
      }

      const offerInput: CreateIssuanceOfferInput = {
        verification: {
          target: {
            email: values.email,
          },
        },
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
      }

      try {
        const issuanceId = await issuanceService.createIssuance(
          apiKeyHash,
          issuanceJson
        )
        await issuanceService.createOffer(apiKeyHash, issuanceId.id, offerInput)

        router.push(ROUTES.issuer.result)
      } catch(err: unknown) {
        setIsCreating(false)
        setError(err)
      }
    },
    [router]
  )

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
    isCreating,
  }
}
