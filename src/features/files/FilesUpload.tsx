import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import IconButton from '@mui/material/IconButton';
import blue from '@mui/material/colors/blue';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFiles, addFiles } from './filesSlice';
import type { FileLocation } from '../../types/Files';

const FilesUpload = () => {
  const dispatch = useAppDispatch();
  const currentFiles = useAppSelector(getFiles);
  const { t } = useTranslation('files');

  // Prevent duplicate selections
  const fileValidator = (file: File) => {
    if (currentFiles.find(f => f.fileName === file.name)) {
      return {
        code: "file-exists",
        message: `File ${file.name} has already been added`
      };
    }
    return null
  }

  const onDrop = async (acceptedFiles: File[]) => {
    // Need to figure out how to best save file reference to store for uploading later on
    const serializedFiles = acceptedFiles.map( (file, i) => 
      ({
        fileName: file.name,
        readableSize: `${(file.size*9.5367431640625*Math.pow(10, -7)).toFixed(2)} MB`, 
        readableType: file.type ? file.type.replace(/^.*\/(.*)$/, "$1") : file.name.substring(file.name.lastIndexOf('.') + 1),
        location: 'local' as FileLocation,
        // url: URL.createObjectURL(file),
      }));

    // file validation
    // let reader = new FileReader();
    // reader.onload = (e: any) => {
    //   const contents = e.target.result;
    //   console.log(contents);
    // };
    // acceptedFiles.map( (file) => reader.readAsText(file))

    console.log(serializedFiles)
    
    dispatch(addFiles(serializedFiles));
  };

  const {acceptedFiles, getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    validator: fileValidator
  });

  return (
    <Card>
      <CardHeader title={t('addLocal') as string} />
      <CardContent>
        <Box 
          sx={{
            border: '1px dashed grey',
            backgroundColor: isDragActive ? blue[100] : 'white',
          }}
          p={3}
          {...getRootProps({className: 'dropzone'})}
        >
          <input {...getInputProps()} />
          <Typography color="grey" sx={{textAlign: 'center', cursor: 'pointer'}}>{t('drop')}</Typography>
        </Box>
        {fileRejections.length > 0 && <RejectedFiles fileRejections={fileRejections} />}
      </CardContent>
    </Card>
  )
}

const RejectedFiles = ({fileRejections}: any) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation('files');
  return (
    <Collapse in={open}>
      <Alert 
        severity="error" 
        sx={{mt:2}} 
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
        <AlertTitle>{t('fileTypeError')}</AlertTitle>
        <List dense={true}>
          {fileRejections.map( (file: any, i: number) => 
            <ListItem disableGutters>
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText 
                primary={file.file.name}
                secondary={file.errors.map( (error: any, i: number) => `${error.message}${i < file.errors.length - 1 ? ' | ' : ''}`)} />
            </ListItem>
          )}
        </List>
      </Alert>
    </Collapse>
  )
}

export default FilesUpload;
