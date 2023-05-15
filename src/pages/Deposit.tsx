import { SyntheticEvent, useState, Suspense } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Metadata from '../features/metadata/Metadata';
import Files from '../features/files/Files';
import type { TabPanelProps, TabHeaderProps } from '../types/Pages';
import { useAppSelector } from '../app/hooks';
import { getMetadataStatus } from '../features/metadata/metadataSlice';
import { getFiles } from '../features/files/filesSlice';
import { StatusIcon } from '../features/generic/Icons';
import Submit from '../features/submit/Submit';
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';

const Deposit = () => {
  // Have index 0 open on loading page
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container>
        <Grid xs={12} mt={4}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Suspense fallback={<Skeleton width={400} height={50} />}>
              <TabHeader value={value} handleChange={handleChange} />
            </Suspense>
          </Box>
          <Suspense fallback={<Skeleton width={800} height={400} />}>
            <TabPanel value={value} index={0}>
              <Metadata />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Files />
            </TabPanel>
          </Suspense>
        </Grid>
        <Grid xs={12} mt={4} display="flex" justifyContent="end" alignItems="center">
          <Suspense fallback={<Skeleton width={150} height={55} />}>
            <Submit />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  )
}

// Put Tabheader into a separate component, to handle namespace loading and suspense
const TabHeader = ({value, handleChange}: TabHeaderProps) => {
  const { t } = useTranslation(['metadata', 'files']);
  const selectedFiles = useAppSelector(getFiles);
  const metadataStatus = useAppSelector(getMetadataStatus);

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab 
        label={t('heading', {ns: 'metadata'})} 
        icon={<StatusIcon status={metadataStatus} margin="r" />}
        iconPosition="start" />
      <Tab 
        label={t('heading', {ns: 'files'})} 
        icon={<StatusIcon status={selectedFiles.length > 0 ? 'success' : 'warning'} margin="r" />} 
        iconPosition="start" />
    </Tabs>
  )
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default Deposit;