import { SyntheticEvent, useState } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import tabs from '../config/tabs.json';
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
          <Submit />
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