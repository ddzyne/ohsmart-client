import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getFieldStatus } from '../metadataHelpers';
import { StatusIcon } from '../../generic/Icons';
import { setField } from '../metadataSlice';
import type { AutocompleteFieldProps, OptionsType } from '../../../types/Metadata';
import { lookupLanguageString } from '../../../app/i18n';
import { getMetadataSubmitStatus } from '../../submit/submitSlice';

const AutocompleteField = ({field, sectionIndex, isLoading}: AutocompleteFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getFieldStatus(field);
  const { t } = useTranslation('metadata');
  const metadataSubmitStatus = useAppSelector(getMetadataSubmitStatus);

  const options = Array.isArray(field.options) ? field.options as OptionsType[] : [];
  const localizedOptions = options.map( option => ({...option, label: lookupLanguageString(option.label)})) as OptionsType[] || [];

  return (
    <Stack direction="row" alignItems="start">
      <Autocomplete
        multiple={field.multiselect}
        fullWidth 
        id={field.id}
        options={localizedOptions}
        groupBy={(option) => (option.header && lookupLanguageString(option.header)) || ''}
        value={field.value || (field.multiselect ? [] : null)}
        renderInput={
          (params) => 
            <TextField 
              {...params}
              label={`${lookupLanguageString(field.label)}${field.required ? ' *' : ''}`}
              error={status === 'error' && field.touched}
              helperText={status === 'error' && field.touched && t('incorrect')}
            />
        }
        onChange={(e, newValue) => dispatch(setField({
          sectionIndex: sectionIndex,
          id: field.id,
          value: newValue
        }))}
        loading={isLoading === true}
        disabled={metadataSubmitStatus !== ''}
      />
      {field.description && <StatusIcon margin="lt" status={status} title={lookupLanguageString(field.description)} />}
    </Stack>
  )
}

export default AutocompleteField;