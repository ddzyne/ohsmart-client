import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getMetadataStatus, getMetadata, resetMetadata, setSectionStatus, getSessionId } from '../metadata/metadataSlice';
import { getFiles, resetFiles } from '../files/filesSlice';
import { useSubmitDataMutation } from './submitApi';
import { setIsSubmitting } from './submitSlice';
import { formatFormData } from './submitHelpers';
import { useTranslation } from 'react-i18next';
import type { SubmitErrorProps } from '../../types/Submit';
import { setNotification } from '../notification/notificationSlice';

// TODO better error handling
// Spec for submission data

const Submit = () => {
  const [submitting, setSubmitting] = useState(false);
  const selectedFiles = useAppSelector(getFiles);
  const metadataStatus = useAppSelector(getMetadataStatus);
  const metadata = useAppSelector(getMetadata);
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector(getSessionId);
  const progress = selectedFiles.reduce( (n, {submitProgress}) => n + (submitProgress || 0), 0) / selectedFiles.length || undefined;
  const { t } = useTranslation('submit');

  const [submitData, { isUninitialized, isLoading, isSuccess, isError, data, reset }] = useSubmitDataMutation();

  const handleButtonClick = () => {
    formatFormData(sessionId, metadata, selectedFiles).then( d => {
      dispatch(setIsSubmitting(true));
      submitData(d);
    });
  };

  const resetForm = () => {
    console.log('reset')
    dispatch(setIsSubmitting(false));
    dispatch(resetMetadata());
    dispatch(resetFiles());
    dispatch(setSectionStatus(null));
    reset();
  }

  const iconSx = {
    color: 'white',
  }

  return (
    <Stack direction="column" alignItems="flex-end">
      <Stack direction="row" alignItems="center">
        <Typography mr={2}>
          { isUninitialized && (
            metadataStatus === 'error' ?
            t('metadataError') :
            metadataStatus === 'warning' || selectedFiles.length === 0  ?
            t('metadataWarning') :
            t('metadataSuccess')
          ) }
          { isLoading && !progress &&
            t('isLoading')
          }
          { isLoading && progress && progress < 100 &&
            t('hasProgress')
          }
          { isLoading && progress && progress === 100 && !isSuccess &&
            t('isWaiting')
          }
          { isSuccess && 
            t('isSuccess')
          }
          { isError && 
            t('isError')
          }
        </Typography>
        <Box sx={{ mr: 2, position: 'relative' }} display="flex" justifyContent="center" alignItems="center">
          <Box display="flex" justifyContent="center" alignItems="center" sx={{
            p: 1.2,
            borderRadius: '50%',
            backgroundColor: `${
              isSuccess ? 'success' :
              metadataStatus === 'error' ?
              'error' :
              metadataStatus === 'warning' || selectedFiles.length === 0 ?
              'warning' :
              'primary'
            }.main`,
          }}>
            {
              isSuccess ?
              <CheckIcon sx={iconSx} /> :
              metadataStatus === 'error' ?
              <ErrorOutlineOutlinedIcon sx={iconSx} /> :
              <SendIcon sx={iconSx} />
            }
          </Box>
          {isLoading && (
            <CircularProgress
              size={54}
              sx={{
                color: green[500],
                position: 'absolute',
                zIndex: 1,
              }}
              variant={progress ? "determinate" : "indeterminate"}
              value={progress}
            />
          )}
        </Box>
        {isSuccess && <Button
          variant="contained"
          onClick={resetForm}
          size="large"
          sx={{mr:1}}
        >
          {t('reset')}
        </Button> }
        <Button
          variant="contained"
          disabled={isLoading || isSuccess /*|| metadataStatus === 'error' || success*/}
          onClick={handleButtonClick}
          size="large"
        >
          {t('submit')}
        </Button>
      </Stack>
    </Stack>
  );
}

export default Submit;