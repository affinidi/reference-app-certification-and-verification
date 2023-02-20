import { FC, useEffect } from 'react'
import { Formik } from 'formik'

import { JSONLD_CONTEXT_URL } from 'utils/schema'
import { useAuthContext } from 'hooks/useAuthContext'
import { Container, Header, Input, Select, Spinner } from 'components'
import { toast } from 'components/Toast/Toast'

import { initialValues, useCredentialForm } from './useCredentialForm'
import * as S from './CredentialForm.styled'
import { notifyError } from 'utils/notification'
import { messages } from 'utils/messages'

const CredentialForm: FC = () => {
  const { authState } = useAuthContext()
  const { handleSubmit, validate, isCreating, error } = useCredentialForm()

  if (!authState.authorizedAsIssuer) {
    return <Spinner />
  }

  useEffect(() => {
    if (error) {
      if (error.response?.status === 404 || error.response?.status === 500) {
        notifyError(new Error(messages.issuer.error.apiError))
        return;
      }
      notifyError(error)
    }
  }, [error])

  return (
    <>
      <Header title='Enter details' />

      <Container>
        <div className='grid lg:grid-cols-12'>
          <div className='lg:col-span-8 lg:col-start-3'>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={validate}
            >
              {(formikProps) => (
                <form id='form' onSubmit={formikProps.handleSubmit}>
                  <S.Title variant='p1'>
                    Please fill in the form below to issue a generic VC.
                  </S.Title>

                  <Input
                    label='JSON-LD Context URL'
                    value={JSONLD_CONTEXT_URL}
                    disabled
                  />

                  <S.Heading variant='h6'>Generic VC details</S.Heading>

                  <div className='grid lg:grid-cols-2 lg:gap-x-8'>
                    <S.InputWrapper
                      label='First name'
                      name='firstName'
                      placeholder='Enter first name'
                      maxLength={100}
                      value={formikProps.values.firstName}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.firstName
                          ? Boolean(formikProps.errors.firstName)
                          : false
                      }
                      helpText={
                        formikProps.touched.firstName
                          ? formikProps.errors.firstName
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />

                    <S.InputWrapper
                      label='Last name'
                      name='lastName'
                      placeholder='Enter last name'
                      maxLength={100}
                      value={formikProps.values.lastName}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.lastName
                          ? Boolean(formikProps.errors.lastName)
                          : false
                      }
                      helpText={
                        formikProps.touched.lastName
                          ? formikProps.errors.lastName
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                  </div>

                  <S.Heading variant='h6'>Holder information</S.Heading>

                  <div className='grid lg:grid-cols-2 lg:gap-x-8'>
                    <S.InputWrapper
                      label='Holder email'
                      name='targetEmail'
                      type='email'
                      placeholder='Enter holder email'
                      maxLength={100}
                      value={formikProps.values.targetEmail}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.targetEmail
                          ? Boolean(formikProps.errors.targetEmail)
                          : false
                      }
                      helpText={
                        formikProps.touched.targetEmail
                          ? formikProps.errors.targetEmail
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                  </div>

                  <div className='grid lg:grid-cols-3'>
                    <S.ButtonWrapper
                      type='submit'
                      form='form'
                      disabled={!(formikProps.isValid && formikProps.dirty)}
                      loading={isCreating}
                    >
                      Issue generic VC
                    </S.ButtonWrapper>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CredentialForm
