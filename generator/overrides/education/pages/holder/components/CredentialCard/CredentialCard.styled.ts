import { Box } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'

export const CredentialCard = styled(Box)`
  padding: ${pxToRem(24)};
  min-height: initial;
  border-radius: 8px;
  box-shadow: 0 ${pxToRem(4)} ${pxToRem(20)} 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow-wrap: anywhere;
  cursor: pointer;

  * {
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    width: auto;
    padding: 0 ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(24)};
  }
`

export const MortarBoardHatIconContainer = styled.div`
  margin-bottom: ${pxToRem(16)};
`
