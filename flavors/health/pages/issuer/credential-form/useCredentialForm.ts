import { format } from 'date-fns'
import { useCallback, useState } from 'react'
import * as EmailValidator from 'email-validator'
import { useRouter } from 'next/router'

import { JSON_SCHEMA_URL } from 'utils/schema'
import { ROUTES } from 'utils'
import { apiKeyHash, projectDid, projectId } from 'pages/env'

import { parseSchemaURL } from 'services/issuance/parse.schema.url'
import {
  CreateIssuanceInput,
  CreateIssuanceOfferInput,
  VerificationMethod,
} from 'services/issuance/issuance.api'
import { issuanceService } from 'services/issuance'

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
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = useCallback(
    async (values: VcData) => {  
      setIsCreating(true)

      const walletUrl = `${window.location.origin}/holder/claim`
      const { schemaType, jsonSchema, jsonLdContext } = parseSchemaURL(JSON_SCHEMA_URL)

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
            email: values.targetEmail,
          },
        },
        credentialSubject: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
      }

      try {
        const issuanceId = await issuanceService.createIssuance(apiKeyHash, issuanceJson)
        await issuanceService.createOffer(apiKeyHash, issuanceId.id, offerInput)

        router.push(ROUTES.issuer.result)
      } catch {
        setIsCreating(false)
      }
    },
    [router],
  )

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
    isCreating,
  }
}
