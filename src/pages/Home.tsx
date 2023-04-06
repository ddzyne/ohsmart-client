import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import logo from '../images/logo-ohsmart.png';

const Home = () =>
  <Container>
    <Grid container>
      <Grid xs={12} mdOffset={2.5} md={7}>
        <h1>Oh Smart</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vulputate, justo posuere aliquam ullamcorper, felis dui posuere urna, ac vestibulum nunc enim et magna. Aliquam dapibus placerat lacus in efficitur. Ut eu lacus libero. Praesent a sem turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi euismod rhoncus neque vitae ultrices. </p>
        <p>Vestibulum dictum vitae nulla sed commodo. Proin nunc eros, vulputate non quam nec, finibus laoreet ante. Aliquam quis quam sagittis metus commodo posuere nec in neque. Nam dapibus, diam nec gravida faucibus, turpis dui venenatis erat, quis sagittis enim tellus id neque. Sed sit amet ante eu diam semper porta. Donec eget elit sed risus auctor pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. </p>
      </Grid>
      <Grid mdOffset={3.5} md={5}>
        <img src={logo} alt="" title="" />
      </Grid>
    </Grid>
  </Container>

export default Home;