import { Fragment, ReactNode } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

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

export const LoginButton = ({variant}: {variant?: 'contained'}) => {
  const { t } = useTranslation('auth');
  const auth = useAuth();

  console.log(auth);

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
  const { t } = useTranslation('auth');
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