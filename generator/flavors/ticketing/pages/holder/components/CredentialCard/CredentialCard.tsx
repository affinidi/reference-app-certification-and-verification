import { FC } from 'react'
import { format } from 'date-fns'
import { ROUTES } from 'utils'

import { Box, Typography } from 'components'
import { Ticket } from '../Ticket/Ticket'
import { useRouter } from 'next/router'

export type CredentialCardProps = {
  vc: any
  expired?: boolean
}

const CredentialCard: FC<CredentialCardProps> = ({ vc, expired }) => {
  const router = useRouter()

  const credential = {
    title: vc?.credentialSubject?.eventName,
    date: format(new Date(vc?.credentialSubject?.startDate), 'dd.MM.yyyy'),
    time: format(new Date(vc?.credentialSubject?.startDate), 'HH:mm'),
    credentialId: vc?.id,
  }

  return (
    <Ticket
      expired={expired}
      onClick={() => router.push(`${ROUTES.holder.credential}/${credential.credentialId}`)}
    >
      <Box gap={32}>
        <Box>
          <Typography variant="h6">{credential.title}</Typography>
          <Typography variant="s2">Entry Ticket</Typography>
        </Box>

        <Box direction="row" gap={32}>
          <Box>
            <Typography variant="c1">Start Date</Typography>
            <Typography variant="p4">{credential.date}</Typography>
          </Box>
          <Box>
            <Typography variant="c1">Start Time</Typography>
            <Typography variant="p4">{credential.time}</Typography>
          </Box>
        </Box>
      </Box>
    </Ticket>
  )
}

export default CredentialCard
