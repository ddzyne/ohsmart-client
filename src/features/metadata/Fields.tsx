import Grid from '@mui/material/Unstable_Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { memo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setField, addField, deleteField } from './metadataSlice';
import type { FieldProps, GroupFieldProps, TextFieldProps, AutocompleteFieldProps, TextFieldType, FieldButtonProps, InputField } from '../../types/Metadata';
import { getStatus } from './helpers';
import Autocomplete from '@mui/material/Autocomplete';
import { StatusIcon } from '../generic/Icons';
import grey from '@mui/material/colors/grey';

// Memoized Field function, so only the affected field rerenders when form/metadata props change
const SingleField = memo(({field, sectionIndex, groupedFieldId}: FieldProps) => {
  return (
    <Grid xs={12} md={6}>
      {(field.type === 'text' || 
        field.type === 'datetime-local' ||
        field.type === 'date' ||
        field.type === 'number') &&
        <SingleTextField field={field} sectionIndex={sectionIndex} groupedFieldId={groupedFieldId} />
      }
      { field.type === 'repeatSingleField' &&
        field.fields.map( (f: TextFieldType, i: number) => 
          <SingleTextField key={f.id} field={f} sectionIndex={sectionIndex} groupedFieldId={field.id} currentField={i} totalFields={field.fields.length} />
        )
      }
      { field.type === 'autocomplete' &&
        <AutocompleteField field={field} sectionIndex={sectionIndex} groupedFieldId={groupedFieldId} />
      }
    </Grid>
  )
});

const FieldGroup = ({field, sectionIndex}: GroupFieldProps) => {
  // check if group is repeatable. If not, lets wrap that single fieldgroup in an array, so we can use the same map function over it
  const fieldArray = field.repeatable ? field.fields as InputField[][] : [field.fields as InputField[]];

  return (
    <Grid xs={12}>
      <Card>
        <CardHeader 
          title={field.label} 
          subheader={field.description} 
          titleTypographyProps={{fontSize: 16}}
          subheaderTypographyProps={{fontSize: 12}}
          sx={{pb: 0, pl: 3, pr: 3}} 
        />
        {fieldArray &&
          <CardContent>
            {fieldArray.map((groupedField, i) =>
              <Stack 
                direction="row" 
                alignItems="center" 
                key={i} 
                sx={{
                  borderTop: i > 0 ? '1px solid' : 'none',
                  borderColor: grey[300],
                  pt: i > 0 ? 1 : 0,
                  mt: i > 0 ? 1 : 0
                }}
              >
                <Grid container sx={{flex: 1}}>
                  {groupedField.map( f => 
                    <SingleField 
                      key={f.id} 
                      field={f} 
                      sectionIndex={sectionIndex} 
                    />
                  )}
                </Grid>
                {field.repeatable && fieldArray.length > 1 &&
                  <DeleteButton sectionIndex={sectionIndex} groupedFieldId={field.id} deleteFieldIndex={i} size="medium" />
                }
              </Stack>
            )}
          </CardContent>
        }
        {field.repeatable &&
          <CardActions sx={{pl: 3, pr: 3, justifyContent: 'right'}}>
            <Stack direction="row" alignItems="center" justifyContent="end">
              <AddButtonText sectionIndex={sectionIndex} groupedFieldId={field.id} type="group" />
            </Stack>
          </CardActions>
        }
      </Card>
    </Grid>
  )
}

const SingleTextField = ({field, sectionIndex, groupedFieldId, currentField = 0, totalFields = 1}: TextFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);

  return (
    <Stack direction="row" alignItems="center">
      <TextField 
        fullWidth
        error={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '')}
        helperText={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && 'Incorrectly entered'}
        variant="outlined" 
        type={field.type}
        label={field.label}
        required={field.required}
        multiline={field.multiline}
        rows={field.multiline ? 4 : ''}
        value={field.value}
        disabled={field.disabled}
        onChange={(e) => dispatch(setField({
          sectionIndex: sectionIndex,
          id: field.id,
          value: e.target.value,
        }))}
        InputLabelProps={{ 
          shrink: field.type === 'date' || field.type === 'datetime-local' || field.disabled
        }}
        sx={{
          mt: groupedFieldId ? 1 : 0,
        }}
        InputProps={{
          endAdornment: field.description && (
            <InputAdornment position="end">
              <StatusIcon status={status} title={field.description} />
            </InputAdornment>
          ),
        }}
      />
      {field.repeatable && [
        totalFields > 1 && 
        <DeleteButton key="delete" sectionIndex={sectionIndex} groupedFieldId={groupedFieldId} deleteFieldIndex={currentField} />,
        currentField + 1 === totalFields && 
        <AddButton key="add" sectionIndex={sectionIndex} groupedFieldId={groupedFieldId} type="single" />
      ]}
    </Stack>
  )
}

const AutocompleteField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);

  return (
    <Stack direction="row" alignItems="center">
      <Autocomplete
        multiple={field.multiselect}
        fullWidth 
        id={field.id}
        options={field.options}
        value={field.value || (field.multiselect ? [] : null)}
        renderInput={
          (params) => 
            <TextField 
              {...params}
              label={`${field.label}${field.required ? ' *' : ''}`}
              error={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '')}
              helperText={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && 'Incorrectly entered'}
            />
        }
        onChange={(e: any, newValue: string | string[] | null) => dispatch(setField({
          sectionIndex: sectionIndex,
          id: field.id,
          value: newValue
        }))}
      />
      <StatusIcon margin="l" status={status} title={field.description} />
    </Stack>
  )
}

const DeleteButton = ({sectionIndex, groupedFieldId, deleteFieldIndex, size = 'small'}: FieldButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Tooltip title="Remove">
      <IconButton 
        color="error" 
        aria-label="Remove" 
        size={size} 
        onClick={() => dispatch(
          deleteField({
            sectionIndex: sectionIndex, 
            groupedFieldId: groupedFieldId, 
            deleteField: deleteFieldIndex,
          })
        )}>
        <RemoveCircleOutlineIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  )
}

const AddButton = ({sectionIndex, groupedFieldId, type, size = 'small'}: FieldButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Tooltip title="Add another">
      <IconButton 
        color="primary" 
        aria-label="Add another" 
        size={size} 
        onClick={() => dispatch(
          addField({
            sectionIndex: sectionIndex, 
            groupedFieldId: groupedFieldId,
            type: type,
          })
        )}>
        <AddCircleOutlineIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  )
}

const AddButtonText = ({sectionIndex, groupedFieldId, type, size = 'medium'}: FieldButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button 
      onClick={() => dispatch(addField({
        sectionIndex: sectionIndex,
        groupedFieldId: groupedFieldId,
        type: type,
      }))} 
      size={size} 
      startIcon={<AddCircleOutlineIcon />}
    >
      Add another
    </Button>
  )
}

export { SingleField, FieldGroup }