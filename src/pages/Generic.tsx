import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import type { PageProps } from '../types/Pages';
import type { Language } from '../types/Language';
import { lookupLanguageString } from '../app/helpers';

const logo = require(`../config/${process.env.REACT_APP_CONFIG_FOLDER}/images/logo.png`);

const Generic = ({page}: PageProps) => {
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
              <Link to={`/${page.action.link}`}>
                <Button variant="contained" size="large">{lookupLanguageString(page.action.text)}</Button>
              </Link>
            </Box>
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default Generic;