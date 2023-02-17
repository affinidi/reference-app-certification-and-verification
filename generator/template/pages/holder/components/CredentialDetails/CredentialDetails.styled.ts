import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box } from 'components'

export const DataCard = styled.div`
  background-color: ${(props) => props.theme.colors.brand.secondary['50']};
  padding: ${pxToRem(40)};

  @media (max-width: 1024px) {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: ${pxToRem(24)};
  }

  @media (min-width: 1024px) {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`

export const QrCodeCard = styled(Box)`
  background-color: ${(props) => props.theme.colors.brand.secondary['50']};
  position: relative;
  padding: ${pxToRem(40)};

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: ${pxToRem(16)};
    height: ${pxToRem(16)};
    background: ${(props) => props.theme.colors.neutral.secondary['100']};
    border-radius: 50%;
    bottom: ${pxToRem(-9)};
  }

  img {
    border-radius: 16px;

    @media (min-width: 1024px) {
      max-width: none;
      height: ${pxToRem(248)};
    }
  }

  @media (max-width: 1024px) {
    border-bottom: 3px dashed ${props => props.theme.colors.neutral.secondary['100']};;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    &::before,
    &::after {
      bottom: ${pxToRem(-9)};
    }

    &::before {
      left: ${pxToRem(-8)};
    }

    &::after {
      right: ${pxToRem(-8)};
    }
  }

  @media (min-width: 1024px) {
    border-left: 3px dashed ${props => props.theme.colors.neutral.secondary['100']};;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    &::before,
    &::after {
      left: ${pxToRem(-9)};
    }

    &::before {
      top: ${pxToRem(-8)};
    }

    &::after {
      bottom: ${pxToRem(-8)};
    }
  }
`

export const CredentialDetailsCard = styled(Box)`
  flex-direction: row;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    max-width: ${pxToRem(338)};
    margin: 0 auto;
  }
`
