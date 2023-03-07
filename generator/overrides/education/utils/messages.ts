export const messages = {
  home: {
    holder: {
      title: 'Collect certificates',
      description: 'Collect your certificates or view them stored in your wallet',
    },
    verifier: {
      title: 'Verify certificates',
      description: 'Verify certificates with a QR code scanner',
    },
    issuer: {
      title: 'Issue certificates',
      description: 'Issue certificates to your students easily',
    },
  },
  verifier: {
    welcome: 'Welcome to the StudID scanner. Tap “scan QR code” to start checking certificates.',
    result: {
      valid: 'Certificate successfully checked.',
      invalid: 'Certificate is invalid.',
      content: {
        valid: 'Valid certificate',
        invalid: 'Invalid certificate',
        scanError: 'The QR code was not recognized'
      }
    },
  },
  issuer: {
    loginError: 'Incorrect user name or password',
    result: {
      title: 'Certificate issued',
      issued: 'Your certificate has been issued.',
      next: 'Issue next certificate',
      content: {
        issued: 'Certificate successfully issued',
      },
    },
    error: {
      apiError: 'Due to server error the certificate could not be issued.'
    }
  },
  holder: {
    home: {
      title: 'Your certificates',
      noVcs: 'You don\'t have any certificates yet.'
    },
    invalidOtp: 'Code is incorrect, please try again.'
  }
}
