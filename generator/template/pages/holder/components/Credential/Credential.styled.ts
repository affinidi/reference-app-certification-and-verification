import { Box, Typography } from 'components'
import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Div = styled.div<{ nested?: boolean }>`
  margin-left: ${(props) => (props.nested ? pxToRem(12) : '0')};
`

export const SmallHeading = styled(Typography)`
  margin: ${pxToRem(24)} 0 ${pxToRem(4)};
  @media (min-width: 1024px) {
    font-size: ${pxToRem(14)};
  }
`

export const QrCodeContainer = styled.div`
  width: ${pxToRem(242)};
  height: ${pxToRem(242)};
  margin: 0 auto;
  @media (min-width: 1024px) {
    margin: 0 8%;
  }
`

export const Container = styled(Box)`
  padding: 0 ${pxToRem(100)};

  @media (max-width: 576px) {
    padding: 0;
  }
`
