import styled from "styled-components"

import { pxToRem } from "utils"
import  Typography  from "components/Typography/Typography"

export const Title = styled(Typography)`
margin-bottom: ${pxToRem(18)};

  @media (max-width: 1024px) {
    margin-bottom: ${pxToRem(24)};
  }
`