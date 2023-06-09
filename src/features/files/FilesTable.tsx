import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getFiles, removeFile, setFileMeta } from './filesSlice';
import fileRoles from '../../config/global/files/roles';
import fileProcessing from '../../config/global/files/processing';
import type { SelectedFile } from '../../types/Files';
import { useCheckTypeQuery } from './api/dansUtility';
import { useVerifyFileMutation } from './api/dansVerification';
import { LightTooltip } from '../generic/Tooltip';
import { validateFileType } from './filesHelpers';
import styles from './FilesTable.module.css';
import { formatFormFiles } from '../submit/submitHelpers';
import { getSessionId } from '../metadata/metadataSlice';
import { useSubmitDataMutation } from '../submit/submitApi';

const FilesTable = () => {
  const { t } = useTranslation('files');
  const selectedFiles = useAppSelector<SelectedFile[]>(getFiles);

  return (
    selectedFiles.length !== 0 ?
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{p: 1, width: 10}}/>
            <TableCell sx={{p: 1}}>{t('fileName')}</TableCell>
            <TableCell sx={{p: 1}}>{t('fileSize')}</TableCell>
            <TableCell sx={{p: 1}}>{t('fileType')}</TableCell>
            <TableCell sx={{p: 1, width: 10}}>{t('private')}</TableCell>
            <TableCell sx={{p: 1, width: 230}}>{t('role')}</TableCell>
            <TableCell sx={{p: 1, width: 280}}>{t('processing')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedFiles.map( (file) => <FileTableRow key={file.name} file={file} /> )}
        </TableBody>
      </Table>
    </TableContainer>
    : 
    <div/>
  )
}


interface OptionProps {
  file: SelectedFile;
  type: 'process' | 'role';
}

const FileActionOptions = ({file, type}: OptionProps) => {
  const dispatch = useAppDispatch();

  return (
    <Autocomplete
      id={`${file.name}_${type}`}
      size="small"
      multiple={type === 'process'}
      onChange={
        (e, newValue) => 
          dispatch(setFileMeta({
            id: file.id, 
            type: type, 
            value: newValue,
          })
        )
      }
      renderInput={(params) => <TextField {...params} label="Select options" />}
      options={type === 'process' ? fileProcessing : fileRoles}
      value={file[type]}
    />
  )
}

const FileConversion = ({file, valid}: any) => {
  const { data, isLoading, isFetching } = useCheckTypeQuery<any>(file.type);
  const { t } = useTranslation('files');

  return (
    data ?
    <LightTooltip title={
      <>
        <Typography sx={{ fontSize: 14, p: 2 }}>
          {
            file.valid === false ?
            t('invalid', {type: file.type}) :
            data.preferred ? 
            t('noConversion') : 
            t('conversion', {type: data['required-convert-to']}) 
          }
        </Typography>
        <Typography sx={{ 
          fontSize: 12, 
          pl: 2, 
          pr: 2, 
          pb: 1, 
          pt: 1, 
          backgroundColor: `${file.valid === false ? 'error' : data.preferred ? 'success' : 'warning'}.main` 
        }}>
          {
            file.valid === false ?
            t('invalidHead') :
            data.preferred ? 
            t('noConversionHead') : 
            t('conversionHead', {type: file.type}) 
          }
        </Typography>
      </>
    }>
      {
        file.valid === false ?
        <ErrorRoundedIcon color="error" /> :
        data.preferred ? 
        <CheckCircleIcon color="success" /> : 
        <InfoRoundedIcon color="warning" /> 
      }
    </LightTooltip>
    :
    <CircularProgress size={20} />
  )
}

const FileTableRow = ({file}: any) => {
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector(getSessionId);
  const [submitData, { isUninitialized, isLoading, isSuccess, isError, data, reset }] = useSubmitDataMutation();

  // online verification via API... API not working atm.
  // let's not do this for now, takes too long for large files (around 1 min for 10 GB)
  // and slows down the browser by having these files in memory

  // const [blob, setBlob] = useState(null);
  // const [verifyFile, { isUninitialized, isLoading, isSuccess, isError, data, reset }] = useVerifyFileMutation();

  // Convert the file URL back to a File/Blob object
  // useEffect(() => {
  //   const fileBlob = fetch(file.url)
  //     .then((r: any) => r.blob())
  //     .then(b => setBlob(b));
  // }, [file.url]);

  // // Then perform some validation on the file header
  // useEffect(() => {
  //   if (blob) {
  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(blob);
  //     reader.onloadend = (e: any) => {
  //       const arr = (new Uint8Array(e.target.result)).subarray(0, 8);
  //       const hexHeader = [...arr].map(x => x.toString(16).padStart(2, "0")).join('');
  //       const valid = validateFileType(hexHeader);
  //       // offline check
  //       dispatch(setFileMeta({id: file.id, type: 'valid', value: valid === file.type}));
  //       // online check. Probably not with the hexHeader, but API broken atm.
  //       verifyFile({type: file.type, data: hexHeader});
  //     }
  //   }
  // }, [blob]);

  // Start and keep track of upload progress
  useEffect(() => {
    file.shouldSubmit && formatFormFiles(sessionId, file).then( d => submitData(d) );
  }, [file.shouldSubmit])

  return (
    <TableRow className={file.valid === false ? styles.invalid : ''}>
      <TableCell sx={{p: 0, pl: 1}}>
        <IconButton color="primary" size="small" onClick={() => dispatch(removeFile(file))}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell sx={{ p: 1, textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200, overflow: 'hidden'}}>
        {file.name}
      </TableCell>
      <TableCell sx={{p: 1}}>
        {(file.size/1048576).toFixed(2)} MB
      </TableCell>
      <TableCell sx={{p: 1}}>
        <FileConversion file={file} />
      </TableCell>
      <TableCell sx={{p: 0}}>
        <Checkbox 
          checked={file.private}
          onChange={e => dispatch(setFileMeta({id: file.id, type: 'private', value: e.target.checked}))}
          disabled={file.valid === false}
        />
      </TableCell>
      <TableCell sx={{p: 1}}><FileActionOptions type="role" file={file} /></TableCell>
      <TableCell sx={{p: 1}}><FileActionOptions type="process" file={file}  /></TableCell>
    </TableRow>
  )
}

export default FilesTable;