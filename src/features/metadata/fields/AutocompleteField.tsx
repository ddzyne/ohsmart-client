import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import { getStatus } from '../metadataHelpers';
import { StatusIcon } from '../../generic/Icons';
import { setField } from '../metadataSlice';
import type { AutocompleteFieldProps } from '../../../types/Metadata';

const AutocompleteField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);
  const { t } = useTranslation('metadata');

  const options = Array.isArray(field.options) ? field.options : [];

  return (
    <Stack direction="row" alignItems="center">
      <Autocomplete
        multiple={field.multiselect}
        fullWidth 
        id={field.id}
        options={options}
        value={field.value || (field.multiselect ? [] : null)}
        renderInput={
          (params) => 
            <TextField 
              {...params}
              label={`${field.label}${field.required ? ' *' : ''}`}
              error={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '')}
              helperText={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && t('incorrect')}
            />
        }
        onChange={(e, newValue) => dispatch(setField({
          sectionIndex: sectionIndex,
          id: field.id,
          value: newValue
        }))}
      />
      <StatusIcon margin="l" status={status} title={field.description} />
    </Stack>
  )
}

export default AutocompleteField;