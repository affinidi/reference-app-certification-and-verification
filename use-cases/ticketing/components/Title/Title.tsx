import { BoxProps } from 'components/Box/Box'

import * as S from './Title.styled'

export interface TitleProps extends BoxProps {
  title?: string
}

const Title: React.FC<TitleProps> = ({ title, children }) => {
  return (
    <S.Title variant="p1">{children}</S.Title>
  )
}

export default Title