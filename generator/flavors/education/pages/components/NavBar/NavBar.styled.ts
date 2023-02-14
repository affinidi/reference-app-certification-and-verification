import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box } from 'components'

export const Container = styled(Box)`
  padding: ${pxToRem(20)} ${pxToRem(16)};
  height: ${pxToRem(64)};
  background-color: ${(props) => props.theme.colors.brand.primary['100']};

  @media (min-width: 1024px) {
    padding: ${pxToRem(22)} ${pxToRem(100)};
    height: ${pxToRem(72)};
  }
`

export const ButtonContainer = styled.div`
  margin-bottom: ${pxToRem(24)};

  * {
    cursor: pointer;
    text-decoration: none;
    color: ${(props) => props.theme.colors.neutral.secondary['100']};
  }
`

export const LogoWrapper = styled.div`
  cursor: pointer;
`

export const IconWrapper = styled.div`
  cursor: pointer;
`

export const Content = styled(Box)`
  padding: ${pxToRem(100)};

  @media (max-width: 1024px) {
    padding: ${pxToRem(76)} ${pxToRem(24)} ${pxToRem(24)};
  }
`
