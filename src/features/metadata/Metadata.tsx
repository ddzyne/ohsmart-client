import { useState, SyntheticEvent } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import type { Field, FormType } from '../../types/Metadata';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { SingleField, FieldGroup } from './Fields';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getMetadata, setField, getOpenPanel, setOpenPanel } from './metadataSlice';

const Form = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector(getMetadata);
  const openPanel = useAppSelector(getOpenPanel);

  // handles accordion open/close actions, sends to redux store
  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      dispatch(setOpenPanel(isExpanded ? panel : false));
    };

  return (
    <>
      {(metadata as FormType[]).map((section, sectionNumber) => {
        // Find fields that haven't been filled in yet, to mark sections accordingly.
        // If required, set status to red, if not required, set status to warning
        const sectionStatus = section.fields.map( (field) => {
          if ( field.type === 'group' ) {
            field.fields && field.fields.map( (groupedField) => groupedField.required && !groupedField.value ? 'error' : !groupedField.required && !groupedField.value ? 'warning' : 'success' )
          } else {
            return field.required && !field.value ? 'error' : !field.required && !field.value ? 'warning' : 'success';
          }
        });
        const sectionStatusIndicator = sectionStatus.indexOf('error') !== -1 ? 'error' : sectionStatus.indexOf('warning') !== -1 ? 'warning' : 'success';

        return (
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
                  sectionStatusIndicator === 'error' ? 
                  'Needs some more information' : 
                  sectionStatusIndicator === 'warning' ? 
                  'Could be better' : 
                  'Good to go' 
                }>
                {
                  sectionStatusIndicator === 'error' ? <ErrorIcon sx={{ cursor: 'help', mr: 1 }} color={sectionStatusIndicator}/> :
                  sectionStatusIndicator === 'warning' ? <InfoIcon sx={{ cursor: 'help', mr: 1 }} color={sectionStatusIndicator}/> :
                  <CheckCircleIcon sx={{ cursor: 'help', mr: 1 }} color={sectionStatusIndicator}/>
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
      )}
    </>
  )
}



export default Form;