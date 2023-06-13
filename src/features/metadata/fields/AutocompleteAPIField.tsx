import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import { useFetchOrcidQuery } from '../api/orcid';
import { useFetchRorByNameQuery } from '../api/ror';
import { useFetchGeonamesFreeTextQuery } from '../api/geonames';
import { useFetchGettyTermsQuery } from '../api/getty';
import { useFetchSheetsQuery } from '../api/sheets';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getStatus } from '../metadataHelpers';
import { StatusIcon } from '../../generic/Icons';
import { setField, setMultiApiField } from '../metadataSlice';
import type { AutocompleteFieldProps, AutocompleteAPIFieldProps, TypeaheadAPI, ApiLinkProps } from '../../../types/Metadata';
import type { QueryReturnType } from '../../../types/Api';
import { lookupLanguageString } from '../../../app/i18n';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import styles from './AutocompleteField.module.css';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import LaunchIcon from '@mui/icons-material/Launch';
import InputAdornment from '@mui/material/InputAdornment';
import AutocompleteField from './AutocompleteField';
import { getIsSubmitting } from '../../submit/submitSlice';

/*
 *  Type ahead fields for different API endpoints
 *  Create a Component for every endpoint, as we cannot call a hook conditionally
 *  Debounce needed to give the API time to respond and not hammer it with requests
 *  Queries get cached by RTK Query
*/

export const OrcidField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce(inputValue, 500)[0];
  // Fetch data on input change
  const {data, isFetching, isLoading} = useFetchOrcidQuery<QueryReturnType>(debouncedInputValue, {skip: debouncedInputValue === ''});

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

export const RorField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce(inputValue, 500)[0];
  // Fetch data on input change
  const {data, isFetching, isLoading} = useFetchRorByNameQuery<QueryReturnType>(debouncedInputValue, {skip: debouncedInputValue === ''});

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

export const GeonamesField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce(inputValue, 500)[0];
  // Fetch data on input change
  const {data, isFetching, isLoading} = useFetchGeonamesFreeTextQuery<QueryReturnType>(debouncedInputValue, {skip: debouncedInputValue === ''});

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

export const GettyField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce(inputValue, 500)[0];
  // Fetch data on input change
  const {data, isFetching, isLoading} = useFetchGettyTermsQuery<QueryReturnType>(debouncedInputValue, {skip: debouncedInputValue === ''});

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


// Google Sheets field, gets all values at once
// So just use a simple AutocompleteField with options fetched from the API
export const SheetsField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  // Fetch data right away
  const {data, isFetching, isLoading} = useFetchSheetsQuery<QueryReturnType>(field.sheetOptions);

  const newField = {...field, options: data && data.response ? data.response : []};

  return (
    <AutocompleteField 
      field={newField} 
      sectionIndex={sectionIndex} 
      isLoading={isLoading || isFetching} 
    />
  )
}

export const MultiApiField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('metadata');
  const isSubmitting = useAppSelector(getIsSubmitting);

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
          disabled={isSubmitting}
        >
          {Array.isArray(field.options) && (field.options as TypeaheadAPI[]).map( option => 
            <MenuItem key={option} value={option}>{t(option)}</MenuItem>
          )}
        </Select>
      </FormControl>
      {field.multiApiValue === 'ror' && <RorField field={field} sectionIndex={sectionIndex} />}
      {field.multiApiValue === 'orcid' && <OrcidField field={field} sectionIndex={sectionIndex} />}
      {field.multiApiValue === 'geonames' && <GeonamesField field={field} sectionIndex={sectionIndex} />}
    </Stack>
  )
}

const ApiLink = ({link, apiValue, chip}: ApiLinkProps) => {
  const { t } = useTranslation('metadata');
  return (
    <InputAdornment position="start" sx={{ml: chip ? 1.5 : 0.5, mr: chip ? -0.75 : 0.25}}>
      <Tooltip title={t('checkApi', {api: t(apiValue)})}>
        <a href={link} target="_blank" style={{lineHeight:0}} rel="noreferrer">
          <LaunchIcon color="primary" sx={{fontSize: 16, '&:hover': {color: 'primary.dark'}}} />
        </a>
      </Tooltip>
    </InputAdornment>
  )
}

const AutocompleteAPIField = ({
  field, 
  sectionIndex, 
  inputValue, 
  setInputValue, 
  debouncedInputValue, 
  data, 
  isLoading, 
  isFetching,
}: AutocompleteAPIFieldProps) => {
  const dispatch = useAppDispatch();
  const status = getStatus(field);
  const { t } = useTranslation('metadata');
  const apiValue = (Array.isArray(field.options) ? field.multiApiValue : field.options) as TypeaheadAPI;
  const isSubmitting = useAppSelector(getIsSubmitting);

  return (
    <Stack direction="row" alignItems="center" sx={{flex: 1}}>
      <Autocomplete
        multiple={field.multiselect}
        filterOptions={x => x}
        fullWidth 
        includeInputInList
        id={field.id}
        options={inputValue && debouncedInputValue === inputValue && data && data.arg === debouncedInputValue ? data.response : []}
        value={field.value || (field.multiselect ? [] : null)}
        inputValue={
          inputValue ||
          (!inputValue && field.value && !Array.isArray(field.value) && lookupLanguageString(field.value.label)) || 
          ''
        }
        renderInput={
          (params) => 
            <TextField 
              {...params}
              label={`${lookupLanguageString(field.label)}${field.required ? ' *' : ''}`}
              error={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && field.required}
              helperText={field.hasOwnProperty('valid') && (!field.valid && field.valid !== '') && field.required && t('incorrect')}
              InputProps={{
                ...params.InputProps,
                startAdornment: !field.multiselect && field.value && !Array.isArray(field.value) ? 
                  <ApiLink link={field.value.value} apiValue={apiValue} /> :
                  params.InputProps.startAdornment,
              }}
            />
        }
        renderTags={(value, getTagProps) => 
          value.map((option, index) => (
            <Chip
              label={lookupLanguageString(option.label)}
              size="medium"
              icon={<ApiLink link={option.value} apiValue={apiValue} chip={true} />}
              {...getTagProps({ index })}
            />
          ))
        }
        onChange={(e, newValue) => {
          // Gets set when user selects a value from the list
          dispatch(setField({
            sectionIndex: sectionIndex,
            id: field.id,
            value: newValue,
          }));
        }}
        onInputChange={(e, newValue) => {
          // Gets set when user starts typing
          e && e.type === 'change' && setInputValue(newValue);
          // Clears input when user selects a value (inputValue becomes value, which gets displayed in the field)
          // or when a user clicks outside of the box without selecting a value 
          e && (e.type === 'click' || e.type === 'blur') && setInputValue('');
        }}
        noOptionsText={!inputValue ? t('startTyping') : t('noResults')}
        loading={isFetching || isLoading || debouncedInputValue !== inputValue}
        loadingText={<Stack direction="row" justifyContent="space-between" alignItems="end">{t('loading')} <CircularProgress size={18} /></Stack>}
        renderOption={(props, option) => 
          <li {...props} key={option.value} style={{flexWrap: 'wrap'}}>
            {lookupLanguageString(option.label)}
            {option.extra && option.extraLabel && option.extra.length > 0 &&
              <div className={styles.optionExtra}>
                {t(option.extraLabel)}: {option.extra.map( (o, i) => `${o}${i < option.extra!.length - 1 ? ', ' : ''}` )}
              </div>
            }
          </li>
        }
        disabled={isSubmitting}
      />
      <StatusIcon 
        margin="l" 
        status={status} 
        title={lookupLanguageString(field.description)} 
        subtitle={t('apiValue', {api: t(apiValue)}) as string} 
      />
    </Stack>
  )
}
