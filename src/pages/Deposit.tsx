import { SyntheticEvent, useState, Suspense } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Metadata from '../features/metadata/Metadata';
import Files from '../features/files/Files';
import Preferences from '../features/preferences/Preferences';
import Tools from '../features/tools/Tools';
import type { TabPanelProps, ComponentTypes } from '../types/Pages';
import { useAppSelector } from '../app/hooks';
import { getMetadataStatus } from '../features/metadata/metadataSlice';
import { getFiles } from '../features/files/filesSlice';
import { StatusIcon } from '../features/generic/Icons';
import Submit from '../features/submit/Submit';
// Maybe just move tabs here, unconfigurable...
import tabs from '../config/global/tabs';
import { lookupLanguageString } from '../app/helpers';

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
                  label={lookupLanguageString(tab.label)} 
                  icon={
                    tab.data === 'metadata' ? 
                    <Suspense fallback=""><StatusIcon status={metadataStatus} margin="r" /></Suspense> : 
                    tab.data === 'files' ? 
                    <Suspense fallback=""><StatusIcon status={selectedFiles.length > 0 ? 'success' : 'warning'} margin="r" /></Suspense> : 
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
          <Suspense fallback="">
            <Submit />
          </Suspense>
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

export default Deposit;