import { Fragment, ReactNode } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

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

export const SignIn = () => {
  const auth = useAuth();
  const { t } = useTranslation('pages');

  console.log(auth);

  if (auth.isLoading) {
    return (
      <Container>
        <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10}}>
          <CircularProgress />
          <Typography sx={{ml: 2}}>{t('signingIn')}</Typography>
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