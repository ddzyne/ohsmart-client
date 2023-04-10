import { useState, SyntheticEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
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
import { FormType } from '../../types/Form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getMetadata, setMetadata, getOpenPanel, setOpenPanel } from './metadataSlice';

const Form = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useAppDispatch();
  const metadata = useAppSelector(getMetadata);
  const openPanel = useAppSelector(getOpenPanel);

  const onSubmit = (data: any) => console.log(data);

  // handles accordion open/close actions, sends to redux store
  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      dispatch(setOpenPanel(isExpanded ? panel : false));
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {(metadata as FormType[]).map((section, i) => {
        // Find fields that haven't been filled in yet.
        // If required, set status to red, if not required, set status to warning
        const fieldStatus = section.fields.map( (field) => {
          if ( field.type === 'group' ) {
            field.fields && field.fields.map( (groupedField) => groupedField.required && !groupedField.value ? 'error' : !groupedField.required && !groupedField.value ? 'warning' : 'success' )
          } else {
            return field.required && !field.value ? 'error' : !field.required && !field.value ? 'warning' : 'success';
          }
        });
        const fieldStatusIndicator = fieldStatus.indexOf('error') !== -1 ? 'error' : fieldStatus.indexOf('warning') !== -1 ? 'warning' : 'success';
        return (
          <Accordion 
            key={`section-${i}`} 
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
                  fieldStatusIndicator === 'error' ? 
                  'Needs some more information' : 
                  fieldStatusIndicator === 'warning' ? 
                  'Could be better' : 
                  'Good to go' 
                }>
                {
                  fieldStatusIndicator === 'error' ? <ErrorIcon sx={{ cursor: 'help', mr: 1 }} color={fieldStatusIndicator}/> :
                  fieldStatusIndicator === 'warning' ? <InfoIcon sx={{ cursor: 'help', mr: 1 }} color={fieldStatusIndicator}/> :
                  <CheckCircleIcon sx={{ cursor: 'help', mr: 1 }} color={fieldStatusIndicator}/>
                }
              </Tooltip>
              <Typography>{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {section.fields.map((field, j) => {
                  if ( field.type === 'group' ) {
                    return (
                      <Grid key={`group-${field.id}`} xs={12}>
                        <Card>
                          <CardHeader 
                            title={field.label} 
                            subheader={field.description} 
                            titleTypographyProps={{fontSize: 16}}
                            subheaderTypographyProps={{fontSize: 12}}
                            sx={{pb: 0, pl: 3, pr: 3}} 
                          />
                          {field.fields &&
                            <CardContent>
                              <Grid container>
                                {field.fields.map((groupedField, k) =>
                                  <BasicTextField key={`groupedField-${groupedField.id}`} field={groupedField} />
                                )}
                              </Grid>
                            </CardContent>
                          }
                          {field.repeatable &&
                            <CardActions sx={{pl: 3, pr: 3, justifyContent: 'right'}}>
                              <Button size="small" startIcon={<AddCircleOutlineIcon />}>Add another</Button>
                            </CardActions>
                          }
                        </Card>
                      </Grid>
                    )
                  }
                  else {
                    return (
                      <BasicTextField key={`field-${field.id}`} field={field} />
                    )
                  }
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
      )}
    </form>
  )
}

const BasicTextField = ({field}: any) => {
  const dispatch = useAppDispatch();

  return (
    <Grid xs={12} md={6}>
      <Stack direction="row" alignItems="center">
        <TextField 
          fullWidth 
          variant="outlined" 
          type={field.type}
          label={field.label}
          required={field.required}
          multiline={field.multiline}
          rows={4}
          InputLabelProps={{ shrink: true }}
          placeholder={`Enter ${field.label}...`}
          value={field.value}
          onChange={(e) => dispatch(setMetadata({
            field: field,
            value: e.target.value
          }))}
          color={
            field.touched && field.required && !field.value ? "error" : 
            field.touched && !field.required && !field.value ? "warning" :
            field.touched ? "success" : "primary"}
          sx={{
            '& input:valid + fieldset': {
              borderColor: field.value ? 'green' : field.touched && 'orange',
              borderWidth: 2,
            },
            '& input:invalid + fieldset': {
              borderColor: field.touched && 'red',
              borderWidth: 2,
            }
          }}
          InputProps={{
            startAdornment: field.description && (
              <InputAdornment position="start">
                <Tooltip title={field.description}>
                  <InfoIcon sx={{ cursor: 'help' }}/>
                </Tooltip>
              </InputAdornment>
            ),
        }}
        />
        {field.repeatable && 
          <Tooltip title="Add another">
            <IconButton color="primary" aria-label="Add another" size="small">
              <AddCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        }
      </Stack>
    </Grid>
  )
}

export default Form;