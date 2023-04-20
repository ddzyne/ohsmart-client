import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'use-debounce';
import { useFetchOrcidQuery } from '../api/orcid';
import { useFetchRorByNameQuery } from '../api/ror';
import { useAppDispatch } from '../../../app/hooks';
import { getStatus } from '../metadataHelpers';
import { StatusIcon } from '../../generic/Icons';
import { setField } from '../metadataSlice';
import type { AutocompleteFieldProps } from '../../../types/Metadata';

// TODO: 
// API error handling
// Typescript types
// ?

/*
 *  Type ahead fields for different API endpoints
 *  Create a Component for every endpoint, as we cannot call a hook conditionally
 *  Debounce needed to give the API time to respond and not hammer it with requests
 *  Queries get cached by RTK Querymeta
*/

const OrcidField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState('');
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
      data={data || []} 
      isLoading={isLoading} 
      isFetching={isFetching} 
    />
  )
}

const RorField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState('');
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

const AutocompleteAPIField = ({field, sectionIndex, inputValue, setInputValue, debouncedInputValue, data, isLoading, isFetching}: any) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);

  return (
    <Stack direction="row" alignItems="center">
      <Autocomplete
        multiple={field.multiselect}
        filterOptions={(x) => x}
        fullWidth 
        includeInputInList
        id={field.id}
        options={inputValue && debouncedInputValue === inputValue ? data : []}
        value={field.value || (field.multiselect ? [] : null)}
        inputValue={inputValue || (!inputValue && field.value && field.value.label) || ''}
        renderInput={
          (params) => 
            <TextField 
              {...params}
              label={`${field.label}${field.required ? ' *' : ''}`}
              error={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '')}
              helperText={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && 'Incorrectly entered'}
            />
        }
        onChange={(e: any, newValue: any) => {
          // Gets set when user selects a value from the list
          dispatch(setField({
            sectionIndex: sectionIndex,
            id: field.id,
            value: newValue
          }));
        }}
        onInputChange={(e:any, newValue) => {
          // Gets set when user starts typing
          e && e.type === 'change' && setInputValue(newValue);
          // Clears input when user selects a value (inputValue becomes value, which gets displayed in the field)
          // or when a user clicks outside of the box without selecting a value 
          e && (e.type === 'click' || e.type === 'blur') && setInputValue('');
        }}
        noOptionsText={
          !inputValue ?
          'Start typing to search' :
          isFetching || isLoading || debouncedInputValue !== inputValue ?
          'Loading...' :
          'No results'
        }
        renderOption={(props, option) => 
          <li {...props} key={option.value}>
            {option.label}
          </li>
        }
      />
      <StatusIcon margin="l" status={status} title={field.description} />
    </Stack>
  )
}

export { OrcidField, RorField };
