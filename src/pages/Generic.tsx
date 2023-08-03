import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import type { PageProps } from '../types/Pages';
import { lookupLanguageString } from '../app/i18n';
import { useAuth } from 'react-oidc-context';
import { useTranslation } from 'react-i18next';

const logo = require(`../config/${process.env.REACT_APP_CONFIG_FOLDER}/images/logo.png`);

const Generic = ({page}: PageProps) => {
  const auth = useAuth();
  const { t } = useTranslation('pages');

  return (
    <Container>
      <Grid container>
        <Grid 
          mdOffset={page.logo ? 4 : 2.5} 
          md={page.logo ? 4 : 7} 
          smOffset={page.logo ? 3 : 0} 
          sm={page.logo ? 6 : 12} 
          xs={page.logo ? 8 : 12} 
          xsOffset={page.logo ? 2 : 0}
        >
          <h1>
            {page.logo ? 
              <img src={logo} alt="OH-SMArt" title="OH-SMArt" /> :
              lookupLanguageString(page.name)
            }
          </h1>
        </Grid>

        <Grid xs={12} mdOffset={2.5} md={7}>
          {page.content && 
            <div dangerouslySetInnerHTML={{__html: lookupLanguageString(page.content) || ''}} />
          }
          {page.action && 
            <Box mt={4} display="flex" justifyContent="center">
              {
                (page.action.restricted && auth.isAuthenticated) || !page.action.restricted ?
                <Link to={`/${page.action.link}`}>
                  <Button variant="contained" size="large">{lookupLanguageString(page.action.text)}</Button>
                </Link>:
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => void auth.signinRedirect()}
                >
                  {t('login')}
                </Button>
              }
            </Box>
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default Generic;