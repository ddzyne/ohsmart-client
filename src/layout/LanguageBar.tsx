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
    bgcolor: 'primary.dark',
    color: 'white',
  }}>
    <Container>
      <Stack direction="row" justifyContent="end" pt={0.5} pb={0.5}>
        <Button size="small" startIcon={<GB className={styles.flag} />} sx={{mr:2, color: '#fff'}}>English</Button>
        <Button size="small" startIcon={<NL className={styles.flag} />} sx={{color: '#fff'}}>Nederlands</Button>
      </Stack>
    </Container>
  </Box>

export default LanguageBar;