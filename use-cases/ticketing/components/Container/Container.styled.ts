import styled from 'styled-components'

import { pxToRem } from 'utils'
import Typography from '../Typography/Typography'

export const Container = styled.div`
  padding: 0 ${pxToRem(100)};

  @media (max-width: 1024px) {
    padding: 0 ${pxToRem(24)};
  }
`

export const Title = styled(Typography)`
  padding-bottom: ${pxToRem(40)};

  @media (max-width: 1024px) {
    padding-bottom: ${pxToRem(24)};
  }
`
