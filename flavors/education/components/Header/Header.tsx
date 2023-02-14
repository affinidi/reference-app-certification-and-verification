import { FC, Fragment } from 'react'
import { useRouter } from 'next/router'
import { Container } from 'components'
import { BackIcon } from 'assets/back-icon'
import { wrapInContainer } from './Header.theme'

import * as S from './Header.styled'

export type HeaderProps = {
  title: string
  hasBackIcon?: boolean
  path?: string
}

const Header: FC<HeaderProps> = ({ title, hasBackIcon, path }) => {
  const navigate = useRouter()
  const Wrapper = wrapInContainer ? Container : Fragment

  return (
    <Wrapper>
      <S.Container justifyContent='flex-end'>
        {hasBackIcon && (
          <S.IconWrapper
            onClick={() =>
              path ? navigate.push(path) : hasBackIcon ? navigate.back() : null
            }
          >
            <BackIcon />
          </S.IconWrapper>
        )}

        <S.Title variant='h4'>{title}</S.Title>
      </S.Container>
    </Wrapper>
  )
}

export default Header
