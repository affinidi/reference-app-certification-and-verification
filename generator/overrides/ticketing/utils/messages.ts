export const messages = {
  home: {
    holder: {
      title: 'Collect tickets',
      description: 'Collect your tickets or view tickets stored in your wallet',
    },
    verifier: {
      title: 'Verify tickets',
      description: 'Verify tickets with a QR code scanner',
    },
    issuer: {
      title: 'Issue tickets',
      description: 'Issue tickets to your customers easily',
    },
  },
  verifier: {
    welcome: 'Welcome to the Eventi ticket scanner. Tap “scan QR code” to start checking tickets.',
    result: {
      valid: 'Ticket successfully checked.',
      invalid: 'Ticket is invalid.',
      content: {
        valid: 'Valid ticket',
        invalid: 'Invalid ticket',
        scanError: 'The QR code was not recognized'
      }
    },
  },
  issuer: {
    loginError: 'Incorrect user name or password',
    result: {
      title: 'Ticket issued',
      issued: 'Your ticket has been issued.',
      next: 'Issue next ticket',
      content: {
        issued: 'Ticket successfully issued',
      },
    },
    error: {
      apiError: 'Due to server error the ticket could not be issued.'
    }
  },
  holder: {
    home: {
      title: 'Your tickets',
      noVcs: 'You don\'t have any tickets yet.'
    }
  }
}
