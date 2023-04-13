import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { NL, GB } from 'country-flag-icons/react/1x1';
import styles from './LanguageBar.module.css';

const LanguageBar = () =>
  <Box sx={{
    zIndex: 2,
    position: 'relative',
    bgcolor: 'neutral.main',
  }}>
    <Container>
      <Stack direction="row" justifyContent="end" pt={1} pb={1}>
        <Button startIcon={<GB className={styles.flag} />} sx={{mr:1, color: '#222'}}>English</Button>
        <Button startIcon={<NL className={styles.flag} />} sx={{color: '#222'}}>Nederlands</Button>
      </Stack>
    </Container>
  </Box>

export default LanguageBar;