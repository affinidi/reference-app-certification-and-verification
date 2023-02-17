export const messages = {
  home: {
    holder: {
      title: 'Collect prescriptions',
      description: 'Collect your prescriptions or view them stored in your wallet',
    },
    verifier: {
      title: 'Verify prescriptions',
      description: 'Verify prescriptions with a QR code scanner',
    },
    issuer: {
      title: 'Issue prescriptions',
      description: 'Issue prescriptions to your patients easily',
    },
  },
  verifier: {
    welcome: 'Welcome to the healthi scanner. Tap “scan QR code” to start checking prescriptions.',
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
    error: {
      apiError: 'Due to server error the prescription could not be issued.'
    }

  },
  holder: {
    home: {
      title: 'Your prescriptions',
      noVcs: 'You don\'t have any prescriptions yet.'
    }
  }
}
