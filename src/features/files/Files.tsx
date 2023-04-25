import Grid from '@mui/material/Unstable_Grid2';
import FilesTable from './FilesTable';
import FilesUpload from './FilesUpload';
import FilesOnline from './FilesOnline';

const Files = () => 
  <Grid container spacing={2}>
    <Grid xs={6}>
      <FilesUpload />
    </Grid>
    <Grid xs={6} >
      <FilesOnline />
    </Grid>
    <Grid xs={12}>
      <FilesTable />
    </Grid>
  </Grid>

export default Files;