import styled from 'styled-components'

import { pxToRem } from 'utils'

import Box from '../Box/Box'
import Typography from '../Typography/Typography'

export const IconWrapper = styled.div`
  margin-bottom: ${pxToRem(36)};
  cursor: pointer;

  path {
    fill: ${(props) => props.theme.colors.neutral.secondary['100']};
  }
`

export const Container = styled(Box)`
  height: ${pxToRem(144)};
  padding: 0 ${pxToRem(100)};
  background-color: ${(props) => props.theme.colors.brand.primary['90']};
  margin-bottom: ${pxToRem(48)};

  @media (max-width: 1024px) {
    margin-bottom: ${pxToRem(48)};
    padding: 0 ${pxToRem(24)};
    height: ${pxToRem(164)};
  }
`

export const Title = styled(Typography)`
  padding-bottom: ${pxToRem(20)};
  color: ${(props) => props.theme.colors.neutral.secondary['100']};
  @media (max-width: 1024px) {
    padding-bottom: ${pxToRem(24)};
  }
`

