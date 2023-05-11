import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import FilesTable from './FilesTable';
import FilesUpload from './FilesUpload';
import FilesOnline from './FilesOnline';

const Files = () => 
  <Grid container spacing={2}>
    <Grid xs={6}>
      <Suspense fallback={<Skeleton height={180} />}>
        <FilesUpload />
      </Suspense>
    </Grid>
    <Grid xs={6} >
      <Suspense fallback={<Skeleton height={180} />}>
        <FilesOnline />
      </Suspense>
    </Grid>
    <Grid xs={12}>
      <Suspense fallback="">
        <FilesTable />
      </Suspense>
    </Grid>
  </Grid>

export default Files;