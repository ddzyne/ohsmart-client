import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from '../../../app/hooks';
import { setField } from '../metadataSlice';
import { getStatus } from '../metadataHelpers';
import { StatusIcon } from '../../generic/Icons';
import { lookupLanguageString } from '../../../app/i18n';
import type { RadioFieldProps, CheckFieldProps } from '../../../types/Metadata';

// List of radio button options. First value of the options is selected by default, so no need for status checking.
export const RadioField = ({field, sectionIndex}: RadioFieldProps) => {
  const dispatch = useAppDispatch();;

  return (
    <FormControl>
      <FormLabel id={field.id} sx={{display:'flex', mb: 1}}>
        <StatusIcon status="success" margin="r" title={lookupLanguageString(field.description)} />
        {lookupLanguageString(field.label)}
      </FormLabel>
      <RadioGroup
        aria-labelledby={field.id}
        name={field.name}
        value={field.value || field.options[0].value}
        onChange={(e) => dispatch(setField({
          sectionIndex: sectionIndex,
          id: field.id,
          value: e.target.value,
        }))}
      >
        {field.options.map( option =>
          <FormControlLabel 
            key={option.value} 
            value={option.value} 
            control={<Radio sx={{mr: 0.15}}/>} 
            label={lookupLanguageString(option.label)} />
        )}
      </RadioGroup>
    </FormControl>
  )
}

// For a list of checkboxes, we keep the selected values in an array.
export const CheckField = ({field, sectionIndex}: CheckFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);

  return (
    <FormControl
      required={field.required}
      error={field.required && field.value?.length === 0}
      component="fieldset"
    >
      <FormLabel id={field.id} sx={{display:'flex', mb: 1}}>
        <StatusIcon status={status} margin="r" title={lookupLanguageString(field.description)} />
        {lookupLanguageString(field.label)}
      </FormLabel>
      <FormGroup>
        {field.options.map( option =>
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                sx={{mr: 0.15}}
                checked={Boolean(field.value && field.value.indexOf(option.value) !== -1)} 
                onChange={(e) => dispatch(setField({
                  sectionIndex: sectionIndex,
                  id: field.id,
                  value: e.target.checked ? [...field.value || '', e.target.name] : field.value.filter( item => item !== e.target.name),
                }))} 
                name={option.value} />
            }
            label={lookupLanguageString(option.label)}
          />
        )}
      </FormGroup>
    </FormControl>
  )
}
