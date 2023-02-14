export const messages = {
  home: {
    holder: {
      title: 'Collect medical records',
      description: 'Collect your medical records or view them stored in your wallet',
    },
    verifier: {
      title: 'Verify medical records',
      description: 'Verify medical records with a QR code scanner',
    },
    issuer: {
      title: 'Issue medical records',
      description: 'Issue medical records easily',
    },
  },
  verifier: {
    welcome: 'Welcome to the credential scanner. Tap “scan QR code” to start checking prescriptions.',
    result: {
      valid: 'Prescription successfully checked.',
      invalid: 'Prescription is invalid.',
      content: {
        valid: 'Valid prescription',
        invalid: 'Invalid prescription',
      }
    },
  },
  issuer: {
    result: {
      title: 'Prescription issued',
      issued: 'Your prescription has been issued.',
      next: 'Issue next prescription',
      content: {
        issued: 'Prescription successfully issued',
      },
    },
  },
  holder: {
    home: {
      title: 'Your prescriptions',
      expiredVcs: 'Expired prescriptions',
      noVcs: 'You don\'t have any prescriptions yet.'
    }
  }
}
