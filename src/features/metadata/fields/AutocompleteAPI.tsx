import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'use-debounce';
import { useFetchOrcidQuery } from '../MetadataTypeaheadAPI';
import { useAppDispatch } from '../../../app/hooks';
import { getStatus } from '../metadataHelpers';
import { StatusIcon } from '../../generic/Icons';
import { setField } from '../metadataSlice';
import type { AutocompleteFieldProps } from '../../../types/Metadata';

// TODO: 
// Make selection process foul-proof, bit hacky atm.
// Typeahead API selection based on field.options setting
// API error handling
// ?

const AutocompleteFieldAPI = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  // Lets only do an API call every second
  const debouncedInputValue = useDebounce(inputValue, 1000)[0];

  const status = getStatus(field);

  // Fetch data on input change
  const {
    data,
    isFetching,
    isLoading,
  } = useFetchOrcidQuery(debouncedInputValue, {
    // No value, so don't fetch
    skip: inputValue === '',
  });

  console.log(inputValue)
  console.log(data)

  return (
    <Stack direction="row" alignItems="center">
      <Autocomplete
        multiple={field.multiselect}
        filterOptions={(x) => x}
        fullWidth 
        includeInputInList
        id={field.id}
        options={inputValue && data || []}
        value={field.value || (field.multiselect ? [] : null)}
        inputValue={field.multiselect ? inputValue : field.value?.label }
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
          console.log(e)
          // Gets set when user starts typing
          // Some slightly less nice stuff for multiselect inputs
          e && e.type === 'change' && setInputValue(newValue);
          field.multiselect && e && e.type === 'click' && setInputValue('');
          !field.multiselect && e && e.type === 'click' && setInputValue(e.target.textContent);
        }}
        noOptionsText={
          isFetching || isLoading ?
          'Loading...' :
          !inputValue ?
          'Start typing to search' :
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

export default AutocompleteFieldAPI;
