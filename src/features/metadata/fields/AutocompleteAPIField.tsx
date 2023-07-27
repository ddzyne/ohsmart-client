import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import { useFetchOrcidQuery } from '../api/orcid';
import { useFetchRorByNameQuery } from '../api/ror';
import { useFetchGeonamesFreeTextQuery } from '../api/geonames';
import { useFetchGettyAATTermsQuery } from '../api/getty';
import { useFetchSheetsQuery } from '../api/sheets';
import { useFetchDatastationsTermQuery } from '../api/datastations';
import { useFetchDansFormatsQuery } from '../../files/api/dansFormats';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getFieldStatus } from '../metadataHelpers';
import { StatusIcon } from '../../generic/Icons';
import { setField, setMultiApiField } from '../metadataSlice';
import type { AutocompleteFieldProps, AutocompleteAPIFieldProps, TypeaheadAPI, ApiLinkProps, OptionsType } from '../../../types/Metadata';
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
import { getMetadataSubmitStatus } from '../../submit/submitSlice';

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
  const {data, isFetching, isLoading} = useFetchGettyAATTermsQuery<QueryReturnType>(debouncedInputValue, {skip: debouncedInputValue === ''});

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

export const DatastationsField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  const { i18n } = useTranslation();
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInputValue = useDebounce(inputValue, 500)[0];
  // Fetch data on input change
  const {data, isFetching, isLoading} = useFetchDatastationsTermQuery<QueryReturnType>({
    vocabulary: field.options,
    lang: i18n.language,
    query: debouncedInputValue,
  }, {skip: debouncedInputValue === ''});

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

// Google Sheets and DANS file formats fields, get all values at once
// So just use a simple AutocompleteField with options fetched from the API
export const DansFormatsField = ({field, sectionIndex}: AutocompleteFieldProps) => {
  // Fetch data right away
  const {data, isFetching, isLoading} = useFetchDansFormatsQuery<QueryReturnType>(null);
  const newField = {...field, options: data && data.response ? data.response : []};

  return (
    <AutocompleteField 
      field={newField} 
      sectionIndex={sectionIndex} 
      isLoading={isLoading || isFetching} 
    />
  )
}

export const SheetsField = ({field, sectionIndex}: AutocompleteFieldProps) => {
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
  const metadataSubmitStatus = useAppSelector(getMetadataSubmitStatus);

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
          disabled={metadataSubmitStatus !== ''}
        >
          {Array.isArray(field.options) && (field.options as TypeaheadAPI[]).map( option => 
            <MenuItem key={option} value={option}>{t(`multi-${option}`)}</MenuItem>
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

function isFreeSoloOption(option: OptionsType | string | (string | OptionsType)[] | null): option is OptionsType {
  return (option as OptionsType) !== null && (option as OptionsType).hasOwnProperty('freetext');
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
  const status = getFieldStatus(field);
  const { t } = useTranslation('metadata');
  const apiValue = (Array.isArray(field.options) ? field.multiApiValue : field.options) as TypeaheadAPI;
  const metadataSubmitStatus = useAppSelector(getMetadataSubmitStatus);

  return (
    <Stack direction="row" alignItems="center" sx={{flex: 1}}>
      <Autocomplete
        multiple={field.multiselect}
        fullWidth 
        includeInputInList
        id={field.id}
        freeSolo={field.allowFreeText}
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
              error={status === 'error' && field.touched}
              helperText={status === 'error' && field.touched && t('incorrect')}
              placeholder={lookupLanguageString(field.placeholder)}
              InputProps={{
                ...params.InputProps,
                startAdornment: !field.multiselect && field.value && !Array.isArray(field.value) && field.value.value && field.value.value.startsWith('http') ? 
                  <ApiLink link={field.value.value} apiValue={apiValue} /> :
                  params.InputProps.startAdornment,
              }}
            />
        }
        renderTags={(value, getTagProps) => 
          value.map((option, index) => 
            <Chip
              label={(option.freetext ? (option.value) : lookupLanguageString(option.label)) as string}
              size="medium"
              icon={option.value && option.value.startsWith('http') ? <ApiLink link={option.value} apiValue={apiValue} chip={true} /> : undefined}
              {...getTagProps({ index })}
              disabled={option.mandatory}
            />
          )
        }
        onChange={(e, newValue, reason) => {
          // Gets set when user selects a value from the list
          // Make sure a mandatory value cannot get erased
          const saveValues = Array.isArray(field.value) && reason === 'clear' && field.value.filter(v => v.mandatory);

          // In case freesolo is enabled, we create a new custom field value
          // Note that on selection of a value in the dropdown, the value as created as in createFilterOptions (reason is selectOption),
          // But if selected using 'Enter', it's a string (reason is createOption)
          const setValue = 
            // check if it's a multiselect field with a freetext input and value is selected using enter
            Array.isArray(newValue) && field.allowFreeText && typeof newValue[newValue.length - 1] === 'string' ?
            [...newValue.slice(0, -1), { value: newValue[newValue.length - 1], freetext: true, label: newValue[newValue.length - 1] }] :
            // the same for non-multiselect
            (isFreeSoloOption(newValue) || typeof newValue === 'string')  ? 
            {label: typeof newValue === 'string' ? newValue : newValue.value, value: typeof newValue === 'string' ? newValue : newValue.value, freetext: true} :
            // otherwise just return the new value
            newValue;

          // Set the field
          dispatch(setField({
            sectionIndex: sectionIndex,
            id: field.id,
            value: (saveValues || setValue) as OptionsType | OptionsType[],
          }));

          // For freesolo, we reset the input value here
          (reason === 'createOption' || reason === 'selectOption') && setInputValue('');
        }}
        onInputChange={(e, newValue) => {
          // Gets set when user starts typing
          e && e.type === 'change' && setInputValue(newValue);
          // Clears input when user selects a value (inputValue becomes value, which gets displayed in the field)
          // or when a user clicks outside of the box without selecting a value 
          e && (e.type === 'click' || e.type === 'blur') && setInputValue('');
        }}
        noOptionsText={!inputValue ? t('startTyping', {api: t(apiValue)}) : t('noResults')}
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
        filterOptions={(options, params) => {
          if ((data && !data.response) && !isLoading) {
            const filter = createFilterOptions<OptionsType>();
            const filtered = filter(options, params);
            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.label);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                value: inputValue,
                freetext: true,
                label: t('freetext', {name: inputValue, api: t(apiValue)}) as string, 
              });
            }

            return filtered;
          }
          else {
            return options;
          }
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        clearOnBlur
        disabled={metadataSubmitStatus !== ''}
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
