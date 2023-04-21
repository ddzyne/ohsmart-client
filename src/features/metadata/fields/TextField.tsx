import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import { StatusIcon } from '../../generic/Icons';
import { AddButton, DeleteButton } from '../MetadataButtons';
import { setField } from '../metadataSlice';
import { getStatus } from '../metadataHelpers';
import type { SingleTextFieldProps } from '../../../types/Metadata';

const SingleTextField = ({field, sectionIndex, groupedFieldId, currentField = 0, totalFields = 1}: SingleTextFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);
  const { t } = useTranslation('metadata');

  return (
    <Stack direction="row" alignItems="center">
      <TextField 
        fullWidth
        error={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '')}
        helperText={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && t('incorrect')}
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
      {groupedFieldId && [
        totalFields > 1 && 
        <DeleteButton key="delete" sectionIndex={sectionIndex} groupedFieldId={groupedFieldId} deleteFieldIndex={currentField} />,
        currentField + 1 === totalFields && 
        <AddButton key="add" sectionIndex={sectionIndex} groupedFieldId={groupedFieldId} type="single" />
      ]}
    </Stack>
  )
}

export default SingleTextField;