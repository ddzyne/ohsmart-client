import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useAuth } from 'react-oidc-context';
import { useFetchUserProfileQuery, useSaveUserDataMutation } from './authApi';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import { grey } from '@mui/material/colors';
import { NavLink as RouterLink } from 'react-router-dom';

export const UserSettings = () => {
  const { t } = useTranslation('user');
  return (
    <Container>
      <Grid container>
        <Grid xs={12} mdOffset={2.5} md={7}>
          <h1>{t('userSettings')}</h1>
          { import.meta.env.VITE_DATAVERSE_KEY && <UserSettingsItem property={import.meta.env.VITE_DATAVERSE_KEY} />}
        </Grid>
      </Grid>
    </Container>
  )
}

const UserSettingsItem = ({property}: {property: string}) => {
  const { t } = useTranslation('user');
  const { data } = useFetchUserProfileQuery(null);

  const [apiValue, setApiValue] = useState('Loading...');

  // set API key value once it's been retrieved
  useEffect(() => data && setApiValue(data.attributes[property][0] || ''), [data, property]);

  // call keycloak to save new API key
  const [saveData, {isUninitialized, isLoading, isSuccess, isError}] = useSaveUserDataMutation();

  console.log(data)

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      <Typography>
        <Trans
          i18nKey="user:dataverseKeyDescription"
          components={[<Link href="https://demo.ssh.datastations.nl/dataverseuser.xhtml?selectTab=apiTokenTab" target="_blank"/>]}
        />
      </Typography>
      <TextField 
        id="dataverse" 
        label={t('dataverseKey')} 
        variant="outlined" 
        sx={{width: '100%', flex: 1}}
        value={apiValue}
        onChange={(e) => setApiValue(e.target.value)}
      />
      <Button 
        variant="contained" 
        endIcon={<SaveIcon />}
        onClick={() => saveData({
          // need to pass along the entire account object to Keycloak
          ...data,
          attributes: {
            [property]: apiValue
          },
        })}
        disabled={isLoading}
      >
        {isLoading ? t('saving') : t('save')}
      </Button>
    </Stack>
  )
}

export const UserSubmissions = () => {
  const { t } = useTranslation('user');

  return (
    <Container>
      <Grid container>
        <Grid xs={12} mdOffset={2.5} md={7}>
          <h1>{t('userSubmissions')}</h1>
          TBD
        </Grid>
      </Grid>
    </Container>
  )
}

export const UserMenu = () => {
  const auth = useAuth();
  const { t } = useTranslation('user');
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(auth)

  if (auth.isAuthenticated && auth.user) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{bgcolor: grey[300], color: 'black'}}>
            {((auth.user?.profile.given_name as string) || '').charAt(0).toUpperCase()}
            {((auth.user?.profile.family_name as string) || '').charAt(0).toUpperCase()}
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
          <Box sx={{pl: 2, pr: 2, pb: 1, pt: 1}}>
            <Typography sx={{fontSize: '80%', fontWeight: 600, mb: 1}}>{t('loggedIn')}</Typography>
            <Typography>{auth.user?.profile.name}</Typography>
            <Typography sx={{fontSize: '90%', color: 'neutralDark.contrastText'}}>{auth.user?.profile.email}</Typography>
          </Box>
          <Divider />
          <Link component={RouterLink} to="/user-settings" underline="none" color="inherit" onClick={handleCloseUserMenu}>
            <MenuItem>{t('userMenuSettings')}</MenuItem>
          </Link>
          <Link component={RouterLink} to="/user-submissions" underline="none" color="inherit" onClick={handleCloseUserMenu}>
            <MenuItem divider={true}>{t('userMenuSubmissions')}</MenuItem>
          </Link>
          <LogoutButton />
        </Menu>
      </Box>
    );
  }
  return (
    <LoginButton />
  );
}

export const LoginButton = ({variant}: {variant?: 'contained'}) => {
  const { t } = useTranslation('user');
  const auth = useAuth();

  return (
    <Button
      variant={variant || "outlined"}
      sx={!variant ? {
        color: '#fff', 
        borderColor: '#fff',
        '&:hover': {
          borderColor: '#fff',
          backgroundColor: 'rgba(255,255,255,0.1)'
        },
      } : {}}
      onClick={() => void auth.signinRedirect()}
    >
      {t('login')}
    </Button>
  )
}

export const LogoutButton = () => {
  const { t } = useTranslation('user');
  const auth = useAuth();

  // Remove user
  const logOut = () => {
    void auth.removeUser();
  }

  return (
    <MenuItem onClick={logOut}>
      <Typography>{t('logout')}</Typography>
    </MenuItem>
  );
}