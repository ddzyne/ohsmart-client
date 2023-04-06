import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { NL, GB } from 'country-flag-icons/react/3x2';
import styles from './LanguageBar.module.css';

const LanguageBar = () =>
  <Box sx={{
    zIndex: 2,
    position: 'relative',
    bgcolor: 'neutral.main',
  }}>
    <Container>
      <Stack direction="row" justifyContent="end" pt={1} pb={1}>
        <Link variant="body1" color="inherit" href="" underline="none">
          <GB className={styles.flag} /> English
        </Link>
        <Link variant="body1" color="inherit" href="" ml={2} underline="none">
          <NL className={styles.flag} /> Nederlands
        </Link>
      </Stack>
    </Container>
  </Box>

export default LanguageBar;