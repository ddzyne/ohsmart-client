import React, { ReactNode, ReactElement, SyntheticEvent, useState } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import tabs from '../config/tabs.json';
import Form from '../features/form/Form';
import Files from '../features/files/Files';
import Preferences from '../features/preferences/Preferences';
import Tools from '../features/tools/Tools';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface ComponentTypes {
  [key: string]: () => JSX.Element;
}

const components: ComponentTypes = {
  form: Form,
  files: Files,
  preferences: Preferences,
  tools: Tools,
}

const Deposit = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container>
        <Grid mdOffset={1} xs={12} md={10} mt={4}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              {tabs.map( (tab, i) =>
                <Tab key={i} label={tab.label} />
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Deposit;