import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Button, Typography } from 'components'

export const Title = styled(Typography)<{
  $isProject?: "education" | "health" | "ticketing"
}>`
margin-bottom: ${(props) => props.$isProject === "education" ? pxToRem(18) : pxToRem(40)};}

  @media (max-width: 1024px) {
    margin-bottom: ${pxToRem(24)};
  }
`

export const ButtonWrapper = styled(Button)`
  margin-top: ${pxToRem(48)};

  @media (max-width: 1024px) {
    margin-top: ${pxToRem(40)};
  }
`
