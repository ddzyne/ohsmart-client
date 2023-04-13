import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {useDropzone} from 'react-dropzone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import blue from '@mui/material/colors/blue';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fileRoles, fileProcessing } from '../../config/files/Files';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getFiles, addFiles, removeFile, setFileMeta } from './filesSlice';
import type { FileColumns, SelectedFile, FileLocation } from '../../types/Files';
import Autocomplete from '@mui/material/Autocomplete';

const columns: FileColumns[] = [
  { field: 'fileName', headerName: 'Name' },
  { field: 'readableSize', headerName: 'Size' },
  { field: 'readableType', headerName: 'Type' },
];

const Files = () => {
  const dispatch = useAppDispatch();
  const selectedFiles = useAppSelector<SelectedFile[]>(getFiles);
  const [onlineFile, setOnlineFile] = useState('');

  const onDrop = (acceptedFiles: File[]) => {
    const serializedFiles = acceptedFiles.map( (file, i) => ({
      fileName: file.name,
      readableSize: `${(file.size*9.5367431640625*Math.pow(10, -7)).toFixed(2)} MB`, 
      readableType: file.type ? file.type.replace(/^.*\/(.*)$/, "$1") : file.name.substring(file.name.lastIndexOf('.') + 1),
      location: 'local' as FileLocation,
    }));
    dispatch(addFiles(serializedFiles));
    setOnlineFile('');
  };

  const onOnlineAdd = () => {
    const fileToSubmit = {
      fileName: onlineFile.replace(/^.*\/(.*)$/, "$1"),
      readableSize: 'tbd',
      readableType: onlineFile.substring(onlineFile.lastIndexOf('.') + 1),
      location: 'online' as FileLocation,
    }
    dispatch(addFiles([fileToSubmit]));
  }

  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <Card>
          <CardHeader title="Add local file(s)" />
          <CardContent {...getRootProps({className: 'dropzone'})} >
            <Box 
              sx={{
                border: '1px dashed grey',
                backgroundColor: isDragActive ? blue[100] : 'white',
              }}
              p={3}
            >
              <input {...getInputProps()} />
              <Typography color="grey" sx={{textAlign: 'center', cursor: 'pointer'}}>Click me or drag a file to upload!</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={6} >
        <Card sx={{height: '100%'}}>
          <CardHeader title="Add files from URL" />
          <CardContent>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            > 
              <TextField fullWidth size="small" label="Enter file URL" variant="outlined" onChange={e => setOnlineFile(e.target.value)}/>
              <Button onClick={() => onOnlineAdd()} variant="text">Add</Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12}>
        {selectedFiles.length !== 0 &&
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{p: 1, width: 10}}/>
                  {columns.map( (col) => <TableCell sx={{p: 1}} key={col.field}>{col.headerName}</TableCell>)}
                  <TableCell sx={{p: 1, width: 10}}>Private</TableCell>
                  <TableCell sx={{p: 1, width: 230}}>Role</TableCell>
                  <TableCell sx={{p: 1, width: 280}}>Processing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedFiles.map( (file) =>
                  <TableRow key={file.fileName}>

                    <TableCell sx={{p: 0, pl: 1}}>
                      <IconButton color="primary" size="small" onClick={() => dispatch(removeFile(file))}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>

                    {columns.map( (col, i) => 
                      <TableCell 
                        key={`${file.fileName}_${col.field}`} 
                        sx={{ p: 1, textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: i === 0 ? 200 : 'auto', overflow: 'hidden'}}
                      >
                        {file[col.field]}
                        {i === 0 && 
                          <Chip 
                            size="small" 
                            label={file.location} 
                            sx={{
                              ml: 1,
                              fontSize: 10,
                              color: '#fff',
                              backgroundColor: file.location === 'online' ? '#9575cd' : '#00acc1',
                            }}
                          />
                        }
                      </TableCell>
                    )}

                    <TableCell sx={{p: 0}}>
                      <Checkbox 
                        checked={file.restricted}
                        onChange={(e) => dispatch(setFileMeta({fileName: file.fileName, type: 'restricted', value: e.target.checked}))}
                      />
                    </TableCell>
                    <TableCell sx={{p: 1}}><FileActionOptions type="role" file={file} /></TableCell>
                    <TableCell sx={{p: 1}}><FileActionOptions type="process" file={file} /></TableCell>

                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Grid>
    </Grid>
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
      id={`${file.fileName}_${type}`}
      size="small"
      multiple={type === 'process'}
      onChange={
        (e: any, newValue: any) => 
          dispatch(setFileMeta({fileName: file.fileName, type: type, value: newValue}))
      }
      renderInput={(params) => <TextField {...params} label="Select options" />}
      options={type === 'process' ? fileProcessing : fileRoles}
      value={file[type]}
    />
  )
}  

export default Files;