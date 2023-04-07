import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import footer from '../config/footer.json';

const Footer = () =>
  <>
    <Box
      sx={{
        bgcolor: 'neutral.main',
        mt: 8,
        pt: 4,
        pb: 4,
      }}
    >
      <Container>
        <Grid container columns={4}>
          {footer.map( (item, i) => 
            <Grid xs={2} md={1} key={i}>
              <Stack direction="column" alignItems="start">
                {item.header && <h4>{item.header}</h4>}
                {item.links && item.links.map( (link, j) =>
                  <Link href={link.link} underline="none" key={`link-${link.name}`}>
                    {link.name}
                  </Link>
                )}
                {item.freetext && <span dangerouslySetInnerHTML={{__html: item.freetext}} />}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
    <Box
      sx={{
        bgcolor: 'neutralDark.main',
        color: 'neutralDark.contrastText',
        pt: 4,
        pb: 4,
      }}
    >
      <Container>
        <Grid container columns={2}>
          <Grid xs={2} md={1}>
            © DANS 2022, 2023 using DANS Open Data APIs. 
          </Grid>
          <Grid xs={2} md={1}>
            Includes Functionality by The Dataverse Project 5.10.1 build 907-b844672
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>

export default Footer;