import { useState, SyntheticEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import sections from '../../config/formsections';
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

const Form = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {(sections as FormType[]).map((section, i) =>
        <Accordion key={`section-${i}`} expanded={expanded === section.id} onChange={handleChange(section.id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${section.id}-content`}
            id={`${section.id}-header`}
          >
            <Typography>
              {section.title}
            </Typography>
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
    </form>
  )
}

const BasicTextField = ({field}: any) =>
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

export default Form;