import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

export const UserSettings = () => {
  const { t } = useTranslation('pages');

  return (
    <Container>
      <Grid container>
        <Grid xs={12} mdOffset={2.5} md={7}>
          <h1>{t('userSettings')}</h1>
          <Stack direction="column" spacing={1} alignItems="flex-start">
            <Typography>{t('dataverseKeyDescription')}</Typography>
            <Typography sx={{pb: 1}}>
              <Link href="https://demo.ssh.datastations.nl/dataverseuser.xhtml?selectTab=apiTokenTab" target="_blank">Get your key here</Link>.
            </Typography>
            <TextField id="outlined-basic" label={t('dataverseKey')} variant="outlined" sx={{width: '100%', flex: 1}}/>
            <Button variant="contained" endIcon={<SaveIcon />}>
              {t('save')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export const UserSubmissions = () => {
  const { t } = useTranslation('pages');

  return (
    <Container>
      <Grid container>
        <Grid xs={12} mdOffset={2.5} md={7}>
          <h1>{t('userSubmissions')}</h1>
          TBD
        </Grid>
      </Grid>
    </Container>
  )
}