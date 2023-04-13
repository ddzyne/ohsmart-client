import { useEffect, SyntheticEvent } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import type { SectionType } from '../../types/Metadata';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { SingleField, FieldGroup } from './Fields';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getMetadata, getOpenPanel, setOpenPanel, setSectionStatus } from './metadataSlice';

const Form = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector(getMetadata);
  const openPanel = useAppSelector(getOpenPanel);

  // initialize section statusses on initial render
  useEffect(() => {
    dispatch(setSectionStatus(''));
  }, []);

  // handles accordion open/close actions, sends to redux store
  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      dispatch(setOpenPanel(isExpanded ? panel : ''));
    };

  return (
    <>
      {(metadata as SectionType[]).map((section, sectionNumber) => 
        <Accordion 
          key={`section-${section.id}`} 
          expanded={openPanel === section.id} 
          onChange={handleChange(section.id)} 
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${section.id}-content`}
            id={`${section.id}-header`}
          >
            <Tooltip 
              title={
                section.status === 'error' ? 
                'Needs some more information' : 
                section.status === 'warning' ? 
                'Could be better' : 
                'Good to go' 
              }>
              {
                section.status === 'error' ? <ErrorIcon sx={{ cursor: 'help', mr: 1 }} color={section.status}/> :
                section.status === 'warning' ? <InfoIcon sx={{ cursor: 'help', mr: 1 }} color={section.status}/> :
                <CheckCircleIcon sx={{ cursor: 'help', mr: 1 }} color={section.status}/>
              }
            </Tooltip>
            <Typography>{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {section.fields.map((field, fieldNumber) => 
                field.type === 'group' ?
                  <FieldGroup key={`fieldGroup-${field.id}`} field={field} sectionNumber={sectionNumber} fieldNumber={fieldNumber} /> :
                  <SingleField key={`field-${field.id}`} field={field} sectionNumber={sectionNumber} fieldNumber={fieldNumber} />
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  )
}



export default Form;