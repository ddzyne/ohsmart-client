import Grid from '@mui/material/Unstable_Grid2';
import InfoIcon from '@mui/icons-material/Info';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getMetadata, setField, getOpenPanel, setOpenPanel } from './metadataSlice';
import type { Field, SectionType, FieldProps, GroupFieldType } from '../../types/Metadata';
import Autocomplete from '@mui/material/Autocomplete';

export const SingleField = ({field, sectionNumber, fieldNumber}: FieldProps) => {
  const dispatch = useAppDispatch();
  const color = 
    field.required && !field.value ? "error" : 
    !field.required && !field.value ? "warning" :
    "success";

  return (
    <Grid xs={12} md={6}>
      <Stack direction="row" alignItems="center">
        {(
          field.type === 'text' ||
          field.type === 'datetime-local' ||
          field.type === 'date' ||
          field.type === 'number'
        ) &&
          <>
            <TextField 
              fullWidth
              error={field.hasOwnProperty('valid') && !field.valid}
              helperText={field.hasOwnProperty('valid') && !field.valid && 'Incorrectly entered'}
              variant="outlined" 
              type={field.type}
              label={field.label}
              required={field.required}
              multiline={field.multiline}
              rows={field.multiline ? 4 : ''}
              value={field.value}
              disabled={field.disabled}
              onChange={(e) => dispatch(setField({
                sectionNumber: sectionNumber,
                fieldNumber: fieldNumber,
                fieldId: field.id,
                field: field,
                value: e.target.value
              }))}
              InputLabelProps={{ 
                shrink: field.type === 'date' || field.type === 'datetime-local' || field.disabled
              }}
              InputProps={{
                endAdornment: field.description && (
                  <InputAdornment position="end">
                    <Tooltip title={field.description}>
                      <InfoIcon sx={{ cursor: 'help' }} color={color} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            { field.repeatable && 
              <Tooltip title="Add another">
                <IconButton color="primary" aria-label="Add another" size="small">
                  <AddCircleOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            }
          </>
        }
        { field.type === 'autocomplete' &&
          <>
            <Autocomplete
              multiple={field.repeatable}
              fullWidth 
              id={field.id}
              options={field.options}
              value={field.value || (field.repeatable ? [] : null)}
              renderInput={
                (params) => 
                  <TextField 
                    {...params}
                    label={`${field.label}${field.required ? ' *' : ''}`}
                    error={field.hasOwnProperty('valid') && !field.valid}
                    helperText={field.hasOwnProperty('valid') && !field.valid && 'Incorrectly entered'}
                  />
              }
              onChange={(e: any, newValue: string | string[] | null) => dispatch(setField({
                sectionNumber: sectionNumber,
                fieldNumber: fieldNumber,
                fieldId: field.id,
                field: field,
                value: newValue
              }))}
            />
            <Tooltip title={field.description}>
              <InfoIcon sx={{ cursor: 'help', ml: 1 }} color={color} />
            </Tooltip>
          </>
        }
      </Stack>
    </Grid>
  )
}

export const FieldGroup = ({field, sectionNumber, fieldNumber}: FieldProps) =>
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
            {(field as GroupFieldType).fields.map((groupedField, k) =>
              <SingleField key={`groupedField-${groupedField.id}`} field={groupedField} sectionNumber={sectionNumber} fieldNumber={fieldNumber} />
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