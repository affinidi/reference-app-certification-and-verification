import styled from 'styled-components'

import { pxToRem } from 'utils'

import Box from '../Box/Box'
import Typography from '../Typography/Typography'

export const IconWrapper = styled.div`
  margin-bottom: ${pxToRem(36)};
  cursor: pointer;

  path {
    fill: ${(props) => props.theme.colors.neutral.primary['100']};
  }
`

export const Container = styled(Box)`
  height: ${pxToRem(144)};
  margin-bottom: ${pxToRem(48)}

  @media (max-width: 1024px) {
    margin-bottom: ${pxToRem(48)}
    height: ${pxToRem(164)};
  }
`

export const Title = styled(Typography)`
  padding-bottom: ${pxToRem(20)};

  @media (max-width: 1024px) {
    padding-bottom: ${pxToRem(24)};
  }
`
