import styled from "styled-components"

import { pxToRem } from "utils"
import Typography from "../Typography/Typography"

export const Container = styled.div`
  padding: 0 ${pxToRem(100)};

  @media (max-width: 1024px) {
    padding: 0 ${pxToRem(24)};
  }
`

export const Title = styled(Typography)`
  padding: ${pxToRem(48)} 0 ${pxToRem(40)};
  display: flex;
  justify-content: center;

  @media (max-width: 1024px) {
    padding: ${pxToRem(40)} 0 ${pxToRem(24)};
  }
`
