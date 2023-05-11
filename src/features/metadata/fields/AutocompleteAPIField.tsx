import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import { useFetchOrcidQuery } from '../api/orcid';
import { useFetchRorByNameQuery } from '../api/ror';
import { useAppDispatch } from '../../../app/hooks';
import { getStatus } from '../metadataHelpers';
import { StatusIcon } from '../../generic/Icons';
import { setField, setMultiApiField } from '../metadataSlice';
import type { AutocompleteFieldProps, AutocompleteAPIFieldProps, TypeaheadAPI } from '../../../types/Metadata';
import { lookupLanguageString } from '../../../app/helpers';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

/*
 *  Type ahead fields for different API endpoints
 *  Create a Component for every endpoint, as we cannot call a hook conditionally
 *  Debounce needed to give the API time to respond and not hammer it with requests
 *  Queries get cached by RTK Query
*/

const OrcidField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce(inputValue, 500)[0];
  // Fetch data on input change
  const {data, isFetching, isLoading} = useFetchOrcidQuery(debouncedInputValue, {skip: debouncedInputValue === ''});

  return (
    <AutocompleteAPIField 
      field={field} 
      sectionIndex={sectionIndex} 
      inputValue={inputValue} 
      setInputValue={setInputValue} 
      debouncedInputValue={debouncedInputValue} 
      data={data} 
      isLoading={isLoading} 
      isFetching={isFetching} 
    />
  )
}

const RorField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce(inputValue, 500)[0];
  // Fetch data on input change
  const {data, isFetching, isLoading} = useFetchRorByNameQuery(debouncedInputValue, {skip: debouncedInputValue === ''});

  return (
    <AutocompleteAPIField 
      field={field} 
      sectionIndex={sectionIndex} 
      inputValue={inputValue} 
      setInputValue={setInputValue} 
      debouncedInputValue={debouncedInputValue} 
      data={data} 
      isLoading={isLoading} 
      isFetching={isFetching} 
    />
  )
}

const MultiApiField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('metadata');

  return (
    <Stack direction="row" alignItems="start">
       <FormControl  sx={{ minWidth: 110, mr: 1 }}>
        <InputLabel id="select-api">{t('multiApiSelectLabel')}</InputLabel>
        <Select
          labelId="select-api"
          label={t('multiApiSelectLabel')}
          onChange={(e) => {
            // set the type of API used
            dispatch(setMultiApiField({
              sectionIndex: sectionIndex,
              id: field.id,
              value: e.target.value,
            }));
            // and reset the currently selected value if there is one
            field.value && dispatch(setField({
              sectionIndex: sectionIndex,
              id: field.id,
              value: '',
            }))
          }}
          value={field.multiApiValue}
        >
          {Array.isArray(field.options) && (field.options as TypeaheadAPI[]).map( option => 
            <MenuItem value={option}>{option}</MenuItem>
          )}
        </Select>
      </FormControl>
      { field.multiApiValue === 'ror' && <RorField field={field} sectionIndex={sectionIndex} />}
      { field.multiApiValue === 'orcid' && <OrcidField field={field} sectionIndex={sectionIndex} />}
    </Stack>
  )
}

const AutocompleteAPIField = ({field, sectionIndex, inputValue, setInputValue, debouncedInputValue, data, isLoading, isFetching}: AutocompleteAPIFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);
  const { t } = useTranslation('metadata');

  return (
    <Stack direction="row" alignItems="center" sx={{flex: 1}}>
      <Autocomplete
        multiple={field.multiselect}
        filterOptions={(x) => x}
        fullWidth 
        includeInputInList
        id={field.id}
        options={inputValue && debouncedInputValue === inputValue && data && data.arg === debouncedInputValue ? data.response : []}
        value={field.value || (field.multiselect ? [] : null)}
        inputValue={inputValue || (!inputValue && field.value && field.value.label) || ''}
        renderInput={
          (params) => 
            <TextField 
              {...params}
              label={`${lookupLanguageString(field.label)}${field.required ? ' *' : ''}`}
              error={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '')}
              helperText={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && t('incorrect')}
            />
        }
        onChange={(e, newValue) => {
          // Gets set when user selects a value from the list
          dispatch(setField({
            sectionIndex: sectionIndex,
            id: field.id,
            value: newValue
          }));
        }}
        onInputChange={(e, newValue) => {
          // Gets set when user starts typing
          e && e.type === 'change' && setInputValue(newValue);
          // Clears input when user selects a value (inputValue becomes value, which gets displayed in the field)
          // or when a user clicks outside of the box without selecting a value 
          e && (e.type === 'click' || e.type === 'blur') && setInputValue('');
        }}
        noOptionsText={
          !inputValue ?
          t('startTyping') :
          isFetching || isLoading || debouncedInputValue !== inputValue ?
          <Stack direction="row" justifyContent="space-between" alignItems="end">{t('loading')} <CircularProgress size={18} /></Stack> :
          t('noResults')
        }
        renderOption={(props, option) => 
          <li {...props} key={option.value}>
            {lookupLanguageString(option.label)}
          </li>
        }
      />
      {field.description && <StatusIcon margin="l" status={status} title={lookupLanguageString(field.description)} />}
    </Stack>
  )
}

export { OrcidField, RorField, MultiApiField };
