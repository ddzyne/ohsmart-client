import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import type { PageProps } from '../types/Pages';
import { lookupLanguageString } from '../utils/language';
import { useAuth } from 'react-oidc-context';
import { useTranslation } from 'react-i18next';
import { LoginButton } from '../user/User';

const Generic = ({page}: PageProps) => {
  const auth = useAuth();
  const { i18n } = useTranslation('pages');

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
              <img src={page.logo} alt="OH-SMArt" title="OH-SMArt" /> :
              lookupLanguageString(page.name, i18n.language)
            }
          </h1>
        </Grid>

        <Grid xs={12} mdOffset={2.5} md={7}>
          {page.content && 
            <div dangerouslySetInnerHTML={{__html: lookupLanguageString(page.content, i18n.language) || ''}} />
          }
          {page.action && 
            <Box mt={4} display="flex" justifyContent="center">
              {
                (page.action.restricted && auth.isAuthenticated) || !page.action.restricted || import.meta.env.VITE_SKIP_AUTHENTICATION ?
                <Link to={`/${page.action.link}`}>
                  <Button variant="contained" size="large">{lookupLanguageString(page.action.text, i18n.language)}</Button>
                </Link>:
                <LoginButton variant="contained" />
              }
            </Box>
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default Generic;