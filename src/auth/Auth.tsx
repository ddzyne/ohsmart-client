import { Fragment, ReactNode, useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthProvider, getAuthProvider } from './authSlice';
import type { AuthProvider } from '../types/Auth';

export const AuthRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }

  return (
    <Navigate to="/" />
  );
}

export const SignInCallback = () => {
  const auth = useAuth();
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();

  // Since on callback, the state is lost, the selected login provider is also lost. 
  // We solve that by getting the neccessary data from the URL, and reentering that into state.
  const params = new URLSearchParams(window.location.search);
  const sessionState = params.get('state') as string;
  const sessionCode = params.get('code') as string;
  useEffect(() => {
    if (sessionState && sessionCode) {
      const provider = 
        window.location.search.indexOf('googleapis') !== -1 ?
        'Google' :
        window.location.search.indexOf('sram') !== -1 ?
        'SRAM' :
        '';
      provider && dispatch(setAuthProvider({
        authority: process.env[`REACT_APP_${provider.toUpperCase()}_AUTHORITY`] as string,
        client_id: process.env[`REACT_APP_${provider.toUpperCase()}_CLIENT_ID`] as string,
        scope: process.env[`REACT_APP_${provider.toUpperCase()}_CLIENT_SCOPE`] as string,
      }));
    }}, 
    [sessionState, sessionCode, dispatch]
  );

  if (auth.isLoading || auth.activeNavigator) {
    return (
      <Container>
        <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10}}>
          <CircularProgress />
          <Typography sx={{ml: 2}}>
            {
              auth.activeNavigator === 'signinSilent' ?
              t('signingIn') :
              auth.activeNavigator === 'signoutRedirect' ?
              t('signingOut') :
              t('isLoading')
            }
          </Typography>
        </Grid>
      </Container>
    );
  }

  if (auth.error) {
    return (
      <Container>
        <Grid container>
          <Grid xs={12} mdOffset={2.5} md={7}>
            <h1>{t('signinError')}</h1>
            <Typography>{auth.error.message}</Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Navigate to="/" />
  );

}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export const LoginButton = ({variant}: {variant?: 'contained'}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('auth');
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const currentProvider = useAppSelector(getAuthProvider);

  console.log(auth);

  // Set authentication provider based on button click from login modal
  const setAuth = (provider: AuthProvider) => {
    dispatch(setAuthProvider({
      authority: process.env[`REACT_APP_${provider.toUpperCase()}_AUTHORITY`] as string,
      client_id: process.env[`REACT_APP_${provider.toUpperCase()}_CLIENT_ID`] as string,
      scope: process.env[`REACT_APP_${provider.toUpperCase()}_CLIENT_SCOPE`] as string,
    }));
  }

  // Check if user has already logged in previously in the session
  // By default, this data gets logged in the active session. Localstorage is also an option...
  const loggedInSession = Object.keys(sessionStorage).find( key => key.startsWith('oidc.user:'));
  // And if so, set that login provider as the active one
  // Todo: Bit of a hacky way to get this, see if there's a nicer method
  // Scope gets retrieved automatically, so no need to set that again
  useEffect(() => {
    if (loggedInSession) {
      const keyArray = loggedInSession.split(':');
      dispatch(setAuthProvider({
        authority: `${keyArray[1]}:${keyArray[2]}`,
        client_id: keyArray[3],
      }));
    }}, 
    [loggedInSession, dispatch]
  );

  // Fires if a login provider has been set (aka after a login button click), and no session info is yet present
  useEffect(() => {
    if (currentProvider.authority !== '' && !auth.isAuthenticated && !auth.isLoading && !auth.activeNavigator && !loggedInSession) {
      void auth.signinRedirect();
    }}, 
    [currentProvider.authority, loggedInSession, auth.isAuthenticated, auth.activeNavigator, auth.isLoading]
  );

  // Map the available providers from the .env file to an actual array
  const providers = (process.env.REACT_APP_ENABLED_AUTH_METHODS as string).split(', ') as AuthProvider[];

  return (
    <>
      <Button
        variant={variant || "outlined"}
        onClick={() => setOpen(true)}
        sx={!variant ? {
          color: '#fff', 
          borderColor: '#fff',
          '&:hover': {
            borderColor: '#fff',
            backgroundColor: 'rgba(255,255,255,0.1)'
          },
        } : {}}
      >
        {t('login')}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Stack spacing={2} sx={modalStyle}>
            <h2 style={{marginTop: 0}}>{t('chooseLogin')}</h2>
            {providers.map(provider =>
              <Button key={provider} variant="outlined" onClick={() => setAuth(provider)}>
                {t('loginProvider', {provider: provider === 'SRAM' || provider === 'SURF' ? t('institution') : provider})}
              </Button>
            )}
          </Stack>
        </Fade>
      </Modal>
    </>
  )
}

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('auth');
  const auth = useAuth();

  // Remove login provider too, otherwise it will automatically log the user in again
  const logOut = () => {
    void auth.removeUser();
    dispatch(setAuthProvider({
      authority: '',
      client_id: '',
      scope: '',
    }));
  }

  return (
    <MenuItem onClick={logOut}>
      <Typography>{t('logout')}</Typography>
    </MenuItem>
  );
}