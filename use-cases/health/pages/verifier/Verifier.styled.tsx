import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'

export const Wrapper = styled.div`
  margin-top: ${pxToRem(48)};
`

export const WelcomeMessage = styled(Typography)`
  margin-top: ${pxToRem(40)};

  @media (min-width: 1024px) {
    margin: ${pxToRem(48)} 0 ${pxToRem(8)};
  }
`