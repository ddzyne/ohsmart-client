import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { DansLogoWhite } from '../images/DansLogo';
import { NavLink as RouterLink } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import type { MenuBarProps } from '../types/Pages';
import { lookupLanguageString } from '../app/i18n';
import { useAuth } from 'react-oidc-context';
import { useTranslation } from 'react-i18next';

const MenuBar = ({pages}: MenuBarProps) => {
  const { i18n } = useTranslation();
  const auth = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };  

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>

          {/* mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            {pages && pages.map((page, i) => ( page.inMenu && page.menuTitle && ((page.restricted && auth.isAuthenticated) || !page.restricted) &&
              <MenuItem key={i} onClick={handleCloseNavMenu}>
                <Link 
                  underline="none" 
                  color="inherit" 
                  component={RouterLink} 
                  to={page.slug}
                >
                  {lookupLanguageString(page.menuTitle, i18n.language)}
                </Link>
              </MenuItem>
            ))}
            </Menu>
            <Link component={RouterLink} to="/" sx={{ ml: 2, width: 100, display: { xs: 'flex', md: 'none' } }}>
              <DansLogoWhite/>
            </Link>
          </Box>

          {/* desktop menu */}
          <Link component={RouterLink} to="/" sx={{ mr: 2, width: 100, display: { xs: 'none', md: 'flex' } }}>
            <DansLogoWhite/>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages && pages.map((page, i) => ( page.inMenu && page.menuTitle && ((page.restricted && auth.isAuthenticated) || !page.restricted) &&
              <Button
                key={i}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink} 
                to={page.slug}
              >
                {lookupLanguageString(page.menuTitle, i18n.language)}
              </Button>
            ))}
          </Box>

          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const UserMenu = () => {
  const auth = useAuth();
  const { t } = useTranslation('pages');
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(auth);

  // useEffect(() => {
  //   if (!hasAuthParams() &&
  //     !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
  //     auth.signinRedirect();
  //   }
  // }, [auth.isAuthenticated, auth.activeNavigator, auth.isLoading, auth.signinRedirect]);

  if (auth.isAuthenticated && auth.user) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{bgcolor: grey[300], color: 'black'}}>
            {(auth.user.profile.given_name as string).charAt(0).toUpperCase()}
            {(auth.user.profile.family_name as string).charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Box onClick={handleCloseUserMenu} sx={{pl: 2, pr: 2, pb: 1, pt: 1}}>
            <Typography sx={{fontSize: '80%', fontWeight: 600, mb: 1}}>{t('loggedIn')}</Typography>
            <Typography>{auth.user.profile.name}</Typography>
            <Typography sx={{fontSize: '90%', color: 'neutralDark.contrastText'}}>{auth.user.profile.email}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => void auth.removeUser()}>
            <Typography>{t('logout')}</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
  return (
    <Button
      variant="outlined"
      onClick={() => void auth.signinRedirect()}
      sx={{
        color: '#fff', 
        borderColor: '#fff',
        '&:hover': {
          borderColor: '#fff',
          backgroundColor: 'rgba(255,255,255,0.1)'
        },
      }}
    >
      {t('login')}
    </Button>
  );
}

export default MenuBar;