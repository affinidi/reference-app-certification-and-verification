import { FC, useEffect } from 'react'
import { Formik } from 'formik'

import { JSONLD_CONTEXT_URL } from 'utils/schema'
import { messages } from 'utils/messages'
import { useAuthContext } from 'hooks/useAuthContext'
import { Container, Header, Input, Spinner } from 'components'
import { showErrorToast } from 'utils/notification'
import { ErrorCodes } from 'enums/errorCodes'

import { initialValues, useCredentialForm } from './useCredentialForm'
import * as S from './CredentialForm.styled'

const CredentialForm: FC = () => {
  const { authState } = useAuthContext()
  const { handleSubmit, validate, isCreating, error } = useCredentialForm()

  useEffect(() => {
    if (error) {
      if (
        error.response?.data?.error?.code === ErrorCodes.INTERNAL_SERVER_ERROR
      ) {
        showErrorToast(new Error(messages.issuer.error.apiError))
      } else {
        showErrorToast(error)
      }
    }
  }, [error])

  if (!authState.authorizedAsIssuer) {
    return <Spinner />
  }

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
                    Please fill in the form below to issue a certificate.
                  </S.Title>

                  <Input label='Schema URL' value={JSONLD_CONTEXT_URL} disabled />

                  <S.Heading variant='h6'>Certificate details</S.Heading>

                  <div className='grid lg:grid-cols-2 lg:gap-x-8'>
                    <S.InputWrapper
                      label='Course title'
                      placeholder='Enter course title'
                      name='courseTitle'
                      maxLength={100}
                      value={formikProps.values.courseTitle}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.courseTitle
                          ? Boolean(formikProps.errors.courseTitle)
                          : false
                      }
                      helpText={
                        formikProps.touched.courseTitle
                          ? formikProps.errors.courseTitle
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label='Issuing institution'
                      placeholder='Issuing institution'
                      name='institution'
                      maxLength={500}
                      value={formikProps.values.institution}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.institution
                          ? Boolean(formikProps.errors.institution)
                          : false
                      }
                      helpText={
                        formikProps.touched.institution
                          ? formikProps.errors.institution
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label='Date of completion'
                      name='dateOfCompletion'
                      type='date'
                      value={formikProps.values.dateOfCompletion}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.dateOfCompletion
                          ? Boolean(formikProps.errors.dateOfCompletion)
                          : false
                      }
                      helpText={
                        formikProps.touched.dateOfCompletion
                          ? formikProps.errors.dateOfCompletion
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                  </div>

                  <S.Heading variant='h6'>Student information</S.Heading>

                  <div className='grid lg:grid-cols-2 lg:gap-x-8'>
                    <S.InputWrapper
                      label='Student name'
                      name='name'
                      maxLength={100}
                      placeholder='Enter Student name'
                      value={formikProps.values.name}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.name
                          ? Boolean(formikProps.errors.name)
                          : false
                      }
                      helpText={
                        formikProps.touched.name ? formikProps.errors.name : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label='Student email'
                      name='email'
                      type='email'
                      placeholder='Enter student email'
                      maxLength={100}
                      value={formikProps.values.email}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.email
                          ? Boolean(formikProps.errors.email)
                          : false
                      }
                      helpText={
                        formikProps.touched.email
                          ? formikProps.errors.email
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
                      Issue certificate
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
