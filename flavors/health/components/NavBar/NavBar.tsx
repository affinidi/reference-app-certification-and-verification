import { FC, Fragment } from 'react'

import { Logo } from 'assets/logo'
import { CloseIcon } from 'assets/close-icon'
import { MenuIcon } from 'assets/menu-icon'
import { Container, Modal, Typography } from 'components'
import { useNavBar } from 'hooks/useNavBar'
import { wrapInContainer } from './NavBar.theme'

import * as S from './NavBar.styled'

const NavBar: FC = () => {
  const { isMenuOpen, setIsMenuOpen, handleLogOut, handleGoHomePage, isAuthorized } = useNavBar()
  const Wrapper = wrapInContainer ? Container : Fragment

  return (
    <>
      <Wrapper>
        <S.Container justifyContent="space-between" alignItems="center" direction="row">
          <S.LogoWrapper onClick={handleGoHomePage}>
            <Logo />
          </S.LogoWrapper>

          {isAuthorized && (
            <>
              {isMenuOpen ? (
                <S.IconWrapper onClick={() => setIsMenuOpen(false)}>
                  <CloseIcon />
                </S.IconWrapper>
              ) : (
                <S.IconWrapper onClick={() => setIsMenuOpen(true)}>
                  <MenuIcon />
                </S.IconWrapper>
              )}
            </>
          )}
        </S.Container>
      </Wrapper>

      {isAuthorized && (
        <Modal open={isMenuOpen} onClose={() => setIsMenuOpen(false)} position="rightSide">
          <S.Content alignItems="flex-end">
            <S.ButtonContainer onClick={handleLogOut}>
              <Typography variant="b1">Log out</Typography>
            </S.ButtonContainer>
          </S.Content>
        </Modal>
      )}
    </>
  )
}

export default NavBar
