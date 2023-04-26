import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../app/hooks';
import { getMetadataStatus, getMetadata } from '../metadata/metadataSlice';
import { getFiles } from '../files/filesSlice';
import { useSubmitDataMutation } from './submitApi';
import { formatFormData } from './submitHelpers';

const Submit = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const selectedFiles = useAppSelector(getFiles);
  const metadataStatus = useAppSelector(getMetadataStatus);
  const metadata = useAppSelector(getMetadata);

  const [submitData, { isLoading: isUpdating }] = useSubmitDataMutation();
  console.log(isUpdating)

  const handleButtonClick = () => {
    formatFormData(metadata, selectedFiles).then( (d: any) => submitData(d) );
  };

  const iconSx = {
    color: 'white',
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography mr={2}>
        {
          metadataStatus === 'error' ?
          'We need some more information before you can submit' :
          metadataStatus === 'warning' || selectedFiles.length === 0  ?
          'You can submit, but your metadata could be more complete' :
          'All set, ready to submit!'
        }
      </Typography>
      <Box sx={{ mr: 2, position: 'relative' }} display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center" sx={{
          p: 1.2,
          borderRadius: '50%',
          backgroundColor: `${
            metadataStatus === 'error' ?
            'error' :
            metadataStatus === 'warning' || selectedFiles.length === 0 ?
            'warning' :
            success ?
            'success' :
            'primary'
          }.main`,
        }}>
          {
            metadataStatus === 'error' ?
            <ErrorOutlineOutlinedIcon sx={iconSx} /> :
            metadataStatus === 'warning'?
            <SendIcon sx={iconSx} /> :
            success ?
            <CheckIcon sx={iconSx} /> :
            <SendIcon sx={iconSx} />
          }
        </Box>
        {isUpdating && (
          <CircularProgress
            size={54}
            sx={{
              color: green[500],
              position: 'absolute',
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Button
        variant="contained"
        disabled={isUpdating /*|| metadataStatus === 'error' || success*/}
        onClick={handleButtonClick}
        size="large"
      >
        Submit data
      </Button>
    </Stack>
  );
}

export default Submit;