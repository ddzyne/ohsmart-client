import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { StatusIcon } from '../../generic/Icons';
import { AddButton, DeleteButton } from '../MetadataButtons';
import { setField } from '../metadataSlice';
import { getStatus } from '../metadataHelpers';
import type { TextFieldProps } from '../../../types/Metadata';
import { lookupLanguageString } from '../../../app/i18n';
import { getMetadataSubmitStatus } from '../../submit/submitSlice';

// TODO: remove date-datetime references

const SingleTextField = ({field, sectionIndex, groupedFieldId, currentField = 0, totalFields = 1}: TextFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);
  const { t } = useTranslation('metadata');
  const metadataSubmitStatus = useAppSelector(getMetadataSubmitStatus);

  return (
    <Stack direction="row" alignItems="start">
      <TextField 
        fullWidth
        error={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && field.required}
        helperText={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && t('incorrect')}
        variant="outlined" 
        type={field.type}
        label={lookupLanguageString(field.label)}
        required={field.required}
        multiline={field.multiline}
        rows={field.multiline ? 4 : ''}
        value={field.value || ''}
        disabled={field.disabled || metadataSubmitStatus !== ''}
        onChange={(e) => dispatch(setField({
          sectionIndex: sectionIndex,
          id: field.id,
          value: e.target.value,
        }))}
        InputLabelProps={{ 
          shrink: field.disabled
        }}
        sx={{
          mt: groupedFieldId && currentField !== 0 ? 1 : 0,
        }}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <StatusIcon status={status} title={field.description && lookupLanguageString(field.description)} />
            </InputAdornment>
          ,
        }}
      />
      {groupedFieldId && !metadataSubmitStatus && [
        totalFields > 1 && 
        <DeleteButton key="delete" sectionIndex={sectionIndex} groupedFieldId={groupedFieldId} deleteFieldIndex={currentField} mt={currentField === 0 ? 1.75 : 2.75} />,
        currentField + 1 === totalFields && 
        <AddButton key="add" sectionIndex={sectionIndex} groupedFieldId={groupedFieldId} type="single" mt={currentField === 0 ? 1.75 : 2.75} />
      ]}
    </Stack>
  )
}

export default SingleTextField;