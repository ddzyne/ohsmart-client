import { SyntheticEvent, useState, useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import tabs from '../config/tabs.json';
import Metadata from '../features/metadata/Metadata';
import Files from '../features/files/Files';
import Preferences from '../features/preferences/Preferences';
import Tools from '../features/tools/Tools';
import Button from '@mui/material/Button';
import type { TabPanelProps, ComponentTypes } from '../types/Pages';
import { useAppSelector } from '../app/hooks';
import { getMetadataStatus } from '../features/metadata/metadataSlice';
import { getFiles } from '../features/files/filesSlice';
import { StatusIcon } from '../features/generic/Icons';

import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const components: ComponentTypes = {
  metadata: Metadata,
  files: Files,
  preferences: Preferences,
  tools: Tools,
}

const Deposit = () => {
  const [value, setValue] = useState(0);
  const selectedFiles = useAppSelector(getFiles);
  const metadataStatus = useAppSelector(getMetadataStatus);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container>
        <Grid xs={12} mt={4}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              {tabs.map( (tab, i) =>
                <Tab 
                  key={i} 
                  label={tab.label} 
                  icon={
                    tab.data === 'metadata' ? 
                    <StatusIcon status={metadataStatus} margin="r" /> : 
                    tab.data === 'files' ? 
                    <StatusIcon status={selectedFiles.length > 0 ? 'success' : 'warning'} margin="r"  /> : 
                    undefined
                  } 
                  iconPosition="start"/>
              )}
            </Tabs>
          </Box>
          {tabs.map( (tab, i) => {
            const Comp = components[tab.data];
            return (
              <TabPanel key={i} value={value} index={i}>
                <Comp />
              </TabPanel>
            )
          })}
        </Grid>
        <Grid xs={12} mt={4} display="flex" justifyContent="end" alignItems="center">
          <SubmitButton />
        </Grid>
      </Grid>
    </Container>
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

const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const selectedFiles = useAppSelector(getFiles);
  const metadataStatus = useAppSelector(getMetadataStatus);

  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const iconSx = {
    color: 'white',
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography mr={2}>
        {
          metadataStatus === 'error' ?
          'We need some more information before you can submit' :
          metadataStatus === 'warning' || selectedFiles.length === 0  ?
          'You can submit, but your metadata could be more complete' :
          success ?
          'Thanks!' :
          loading ?
          'Hold on, submitting your data' : 
          'All set, ready to submit!'
        }
      </Typography>
      <Box sx={{ mr: 2, position: 'relative' }} display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center" sx={{
          p: 1.2,
          borderRadius: '50%',
          backgroundColor: `${
            metadataStatus === 'error' ?
            'error' :
            metadataStatus === 'warning' || selectedFiles.length === 0 ?
            'warning' :
            success ?
            'success' :
            'primary'
          }.main`,
        }}>
          {
            metadataStatus === 'error' ?
            <ErrorOutlineOutlinedIcon sx={iconSx} /> :
            metadataStatus === 'warning'?
            <SendIcon sx={iconSx} /> :
            success ?
            <CheckIcon sx={iconSx} /> :
            <SendIcon sx={iconSx} />
          }
        </Box>
        {loading && (
          <CircularProgress
            size={54}
            sx={{
              color: green[500],
              position: 'absolute',
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Button
        variant="contained"
        disabled={loading || metadataStatus === 'error' || success}
        onClick={handleButtonClick}
        size="large"
      >
        Submit data
      </Button>
    </Stack>
  );
}

export default Deposit;