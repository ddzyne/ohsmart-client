import { useState, SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import sections from '../../config/formsections';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
                    <Grid key={`group-${j}`} xs={12}>
                      <Card>
                        <CardHeader subheader={field.label} sx={{pb: 0, pl: 3, pr: 3}} />
                        {field.fields &&
                          <CardContent>
                            <Grid container>
                              {field.fields.map((groupedField, k) =>
                                <Grid key={`groupedInput-${k}`} xs={12} md={6}>
                                  <TextField fullWidth variant="outlined" {...groupedField} />
                                </Grid>
                              )}
                            </Grid>
                          </CardContent>
                        }
                        {field.repeatable &&
                          <CardActions sx={{pl: 3, pr: 3, justifyContent: 'right'}}>
                            <Button size="small">Add another</Button>
                          </CardActions>
                        }
                      </Card>
                    </Grid>
                  )
                }
                else {
                  return (
                    <Grid key={`grid-${j}`} xs={12} md={6}>
                      <TextField fullWidth variant="outlined" {...field} />
                    </Grid>
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

export default Form;