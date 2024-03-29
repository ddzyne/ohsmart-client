import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
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
import type { SelectedFile, FileActionOptionsProps, FileItemProps } from '../../types/Files';
import { dansUtilityApi, useCheckTypeQuery } from './api/dansUtility';
import { LightTooltip } from '../generic/Tooltip';
import styles from './FilesTable.module.css';
import { getSessionId } from '../metadata/metadataSlice';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { getMetadataSubmitStatus, getSingleFileSubmitStatus } from '../submit/submitSlice';
import { useSubmitFilesMutation } from '../submit/submitApi';
import { formatFileData } from '../submit/submitHelpers';

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

const FileActionOptions = ({file, type}: FileActionOptionsProps) => {
  const dispatch = useAppDispatch();
  const metadataSubmitStatus = useAppSelector(getMetadataSubmitStatus);
  const { t } = useTranslation('files');

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
      renderInput={(params) => <TextField {...params} label={t(type === 'process' ? 'selectOptions' : 'selectOption')} />}
      options={type === 'process' ? fileProcessing : fileRoles}
      value={file[type]}
      disabled={metadataSubmitStatus !== ''}
    />
  )
}

const FileConversion = ({file}: FileItemProps) => {
  const dispatch = useAppDispatch();
  const { data, isError } = useCheckTypeQuery<any>(file.type);
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
    isError ?
    <IconButton 
      onClick={() => dispatch(dansUtilityApi.endpoints.checkType.initiate(file.type, {forceRefetch: true}))} 
      sx={{marginLeft: '-8px'}}
    >
      <Tooltip title={t('fileTypeCheckError')}>
        <ReplayCircleFilledIcon color="error" />
      </Tooltip>
    </IconButton> 
    :
    <CircularProgress size={20} />
  )
}

const FileTableRow = ({file}: FileItemProps) => {
  const dispatch = useAppDispatch();
  const metadataSubmitStatus = useAppSelector(getMetadataSubmitStatus);

  return (
    <>
      <TableRow className={file.valid === false ? styles.invalid : ''}>
        <TableCell sx={{p: 0, pl: 1, borderBottom: 0}}>
          <IconButton color="primary" size="small" onClick={() => !metadataSubmitStatus && dispatch(removeFile(file))} disabled={metadataSubmitStatus !== ''}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
        <TableCell sx={{ p: 1, minWidth: 150, maxWidth: 200, wordBreak: 'break-all', borderBottom: 0}}>
          {file.name}
        </TableCell>
        <TableCell sx={{p: 1, borderBottom: 0}}>
          {(file.size/1048576).toFixed(2)} MB
        </TableCell>
        <TableCell sx={{p: 1, borderBottom: 0}}>
          <FileConversion file={file} />
        </TableCell>
        <TableCell sx={{p: 0, borderBottom: 0}}>
          <Checkbox 
            checked={file.private}
            onChange={e => dispatch(setFileMeta({id: file.id, type: 'private', value: e.target.checked}))}
            disabled={file.valid === false || metadataSubmitStatus !== ''}
          />
        </TableCell>
        <TableCell sx={{p: 1, borderBottom: 0, minWidth: 150}}><FileActionOptions type="role" file={file} /></TableCell>
        {/* TODO: remove or spec this */}
        <TableCell sx={{p: 1, borderBottom: 0, minWidth: 150}}><FileActionOptions type="process" file={file}  /></TableCell>
      </TableRow>
      <UploadProgress file={file} />
    </>
  )
}

const UploadProgress = ({file}: FileItemProps) => {
  // We handle progress and retrying/restarting of file uploads here
  // If metadata submission is successful, and file fails right away, there needs to be an option to manually start file upload.
  // So we check if the submit button has been touched.
  const sessionId = useAppSelector(getSessionId);
  const fileStatus = useAppSelector(getSingleFileSubmitStatus(file.id))
  const { t } = useTranslation('files');
  const [submitFiles/*, { isUninitialized, isLoading, isSuccess, isError, data, reset }*/] = useSubmitFilesMutation();

  const handleSingleFileUpload = () => {
    formatFileData(sessionId, [file])
      .then( d => {
        submitFiles(d);
      });
  }

  return (
    <TableRow>
      <TableCell colSpan={7} sx={{pt: 0, pb: fileStatus && fileStatus.progress ? 1 : 0}}>
        {fileStatus &&
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={fileStatus.progress || 0} 
                color={fileStatus.status === 'success' ? 'success' : fileStatus.status === 'error'  ? 'error' : 'primary'}
                sx={{borderRadius: 2}}
              />
            </Box>
            <Box sx={{ minWidth: 35, textAlign: 'right' }}>
              {fileStatus.status === 'submitting' &&
                <Typography variant="body2" color="text.secondary">{`${fileStatus.progress || 0}%`}</Typography>
              }
              {fileStatus.status === 'success' && 
                <Tooltip title={t('fileSubmitSuccess')}>
                  <CheckCircleIcon color="success" />
                </Tooltip>
              }
              {fileStatus.status === 'error' && 
                <Stack direction="row" alignItems="center">
                  <Typography variant="body2" color="text.secondary">{t('uploadFailed')}</Typography>
                  <IconButton onClick={() => handleSingleFileUpload()}>
                    <Tooltip title={t('fileSubmitError')}>
                      <ReplayCircleFilledIcon color="error" />
                    </Tooltip>
                  </IconButton>
                </Stack>
              }
            </Box>
          </Box>
        }
      </TableCell>
    </TableRow>
  )
}

export default FilesTable;