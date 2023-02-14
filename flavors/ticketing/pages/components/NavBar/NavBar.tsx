import { FC } from 'react'

import { Logo } from 'assets/logo'
import { CloseIcon } from 'assets/close-icon'
import { MenuIcon } from 'assets/menu-icon'
import { Container, Modal, Typography } from 'components'

import { useNavBar } from './useNavBar'
import * as S from './NavBar.styled'

const NavBar: FC = () => {
  const { isMenuOpen, setIsMenuOpen, handleLogOut, handleGoHomePage, isAuthorized } = useNavBar()

  return (
    <>
      <Container>
        <S.Container justifyContent="space-between" alignItems="center" direction="row">
          <S.Logo>
            <Logo onClick={handleGoHomePage} />
          </S.Logo>

          {isAuthorized && (
            <>
              {isMenuOpen ? (
                <S.IconWrapper>
                  <CloseIcon onClick={() => setIsMenuOpen(false)} />
                </S.IconWrapper>
              ) : (
                <S.IconWrapper>
                  <MenuIcon onClick={() => setIsMenuOpen(true)} />
                </S.IconWrapper>
              )}
            </>
          )}
        </S.Container>
      </Container>

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
