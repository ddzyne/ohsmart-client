import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { StatusIcon } from '../../generic/Icons';
import { AddButton, DeleteButton } from '../MetadataButtons';
import { setField } from '../metadataSlice';
import { getFieldStatus } from '../metadataHelpers';
import type { TextFieldProps } from '../../../types/Metadata';
import { lookupLanguageString } from '../../../utils/language';
import { getMetadataSubmitStatus } from '../../submit/submitSlice';
import { useAuth } from 'react-oidc-context';

const SingleTextField = ({field, sectionIndex, groupedFieldId, currentField = 0, totalFields = 1}: TextFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getFieldStatus(field);
  const { t, i18n } = useTranslation('metadata');
  const metadataSubmitStatus = useAppSelector(getMetadataSubmitStatus);
  const auth = useAuth();

  useEffect(() => {
    // if requested, auto fill user data from oidc
    if (auth.user && field.autofill) {
      dispatch(setField({
        sectionIndex: sectionIndex,
        id: field.id,
        value: auth.user.profile[field.autofill] as string,
      }));
    }
  }, [auth.user, dispatch, field.autofill, field.id, sectionIndex]);

  return (
    <Stack direction="row" alignItems="start">
      <TextField 
        fullWidth
        error={status === 'error' && field.touched}
        helperText={status === 'error' && field.touched && t('incorrect')}
        variant="outlined" 
        type={field.type}
        label={lookupLanguageString(field.label, i18n.language)}
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
        placeholder={field.placeholder}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <StatusIcon status={status} title={field.description && lookupLanguageString(field.description, i18n.language)} />
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