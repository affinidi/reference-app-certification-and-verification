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
      }
    },
  },
  issuer: {
    result: {
      title: 'Ticket issued',
      issued: 'Your ticket has been issued.',
      next: 'Issue next ticket',
      content: {
        issued: 'Ticket successfully issued',
      },
    },
  },
  holder: {
    home: {
      title: 'Your tickets',
      expiredVcs: 'Expired tickets',
      noVcs: 'You don\'t have any tickets yet.'
    }
  }
}
