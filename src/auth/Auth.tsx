import { Fragment, ReactNode, useState, useEffect } from 'react';
import { useAuth, hasAuthParams } from 'react-oidc-context';
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
import { setAuthProvider, resetAuthProvider, getAuthProvider } from './authSlice';
import type { AuthProvider } from '../types/Auth';
import { Log } from 'oidc-client-ts';

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

  // Since on callback the app gets reloaded, the state is lost.
  // So we get the login provider from the storage we set on login. 
  const provider = sessionStorage.getItem('dansAuthProvider') as AuthProvider;
  useEffect(() => {
    provider && dispatch(setAuthProvider(provider));
  }, []);

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
  // Also set in storage for reuse later on (app reload)
  const setAuth = (provider: AuthProvider) => {
    if (auth.error) {
      console.log('error bitch')
      auth.clearStaleState();
      auth.revokeTokens();
    }
    sessionStorage.setItem('dansAuthProvider', provider);
    dispatch(setAuthProvider(provider));
  }

  // Check if user has already logged in previously in the session, on page load
  const provider = sessionStorage.getItem('dansAuthProvider') as AuthProvider;
  useEffect(() => {
    Log.setLogger(console);
    Log.setLevel(Log.DEBUG);
    provider && dispatch(setAuthProvider(provider));
  }, []);

  // Fires if a login provider has been set (aka after a login button click)
  useEffect(() => {
    if (currentProvider.authority !== '' && !auth.isAuthenticated && !auth.isLoading && !auth.activeNavigator && !auth.error) {
      void auth.signinRedirect();
    }
  }, [currentProvider.authority, auth.signinRedirect, auth.isAuthenticated, auth.activeNavigator, auth.isLoading, auth.error]);

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

  // Remove login provider and log user out
  const logOut = () => {
    void auth.removeUser().then(() => {
      sessionStorage.removeItem('dansAuthProvider');
      dispatch(resetAuthProvider());
    });
  }

  return (
    <MenuItem onClick={logOut}>
      <Typography>{t('logout')}</Typography>
    </MenuItem>
  );
}