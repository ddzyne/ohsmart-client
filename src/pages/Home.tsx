import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../images/logo-ohsmart.png';
import { Link } from 'react-router-dom';

const Home = () =>
  <Container>
    <Grid container>
      <Grid mdOffset={4} md={4} smOffset={3} sm={6} xs={8} xsOffset={2}>
        <h1><img src={logo} alt="OH-SMArt" title="OH-SMArt" /></h1>
      </Grid>
      <Grid xs={12} mdOffset={2.5} md={7}>
        <Typography>
          DANS collaborates with the OH-SMART project to provide infrastructure for the deposit, preservation, processing and application of audiovisual materials collected by museums and research institutions. OH-SMART concentrates on oral histories - interviews conducted at art museums.
        </Typography>
        <Box mt={4} display="flex" justifyContent="center">
          <Link to="/deposit"><Button variant="contained" size="large">Deposit data</Button></Link>
        </Box>
      </Grid>
    </Grid>
  </Container>

export default Home;