import { FC } from 'react'

import { Logo } from 'assets/logo'
import { CloseIcon } from 'assets/close-icon'
import { MenuIcon } from 'assets/menu-icon'
import { Modal, Typography } from 'components'

import { useNavBar } from './useNavBar'
import * as S from './NavBar.styled'

const NavBar: FC = () => {
  const { isMenuOpen, setIsMenuOpen, handleLogOut, handleGoHomePage, isAuthorized } = useNavBar()

  return (
    <>
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
