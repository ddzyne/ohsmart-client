import { useCallback, useState, Fragment } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {useDropzone} from 'react-dropzone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
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
import MenuItem from '@mui/material/MenuItem';
import { fileRoles, fileProcessing } from '../../config/files/Files';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getFiles, addFiles, removeFile, setFileMeta } from './filesSlice';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const columns: any = [
  { field: 'fileName', headerName: 'Name' },
  { field: 'readableSize', headerName: 'Size' },
  { field: 'readableType', headerName: 'Type' },
/*  { field: 'role', headerName: 'Role' },
  { field: 'restricted', headerName: 'Restricted' },
  { field: 'process', headerName: 'Process' },*/
];

const Files = () => {
  const dispatch = useAppDispatch();
  const selectedFiles = useAppSelector(getFiles);
  const [open, setOpen] = useState('');

  const onDrop = (acceptedFiles: any) => {
    const serializedFiles = acceptedFiles.map( (file: any, i: number) => ({
      fileName: file.name,
      readableSize: `${(file.size*9.5367431640625*Math.pow(10, -7)).toFixed(2)} MB`, 
      readableType: file.type.replace(/^.*\/(.*)$/, "$1"),
    }));
    dispatch(addFiles(serializedFiles));
  };

  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Card>
          <CardHeader title="Add file(s)" />
          <CardContent {...getRootProps({className: 'dropzone'})} >
            <Box 
              sx={{
                border: '1px dashed grey',
                backgroundColor: isDragActive ? blue[100] : 'white',
              }}
              p={3}
            >
              <input {...getInputProps()} />
              <Typography color="grey">Click me or drag a file to upload!</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{p: 1, width: 10}}/>
                {columns.map( (col: any) => <TableCell sx={{p: 1}} key={col.field}>{col.headerName}</TableCell>)}
                <TableCell sx={{p: 1, width: 10}}>Private</TableCell>
                <TableCell sx={{p: 1, width: 120}}>Role</TableCell>
                <TableCell sx={{p: 1, width: 200}}>Processing</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedFiles.map( (file: any) =>
                <TableRow key={file.fileName}>

                  <TableCell sx={{p: 0, pl: 1}}>
                    <IconButton color="primary" size="small" onClick={() => dispatch(removeFile(file))}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>

                  {columns.map( (col: any, i: number) => 
                    <TableCell key={`${file.fileName}_${col.field}`} sx={{ p: 1, textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: i === 0 ? 200 : 'auto', overflow: 'hidden'}}>
                      {file[col.field]}
                    </TableCell>
                  )}

                  <TableCell sx={{p: 0}}><Checkbox/></TableCell>

                  <TableCell sx={{p: 1}}>
                    <FormControl fullWidth>
                      <InputLabel size="small">Select</InputLabel>
                      <Select
                        id={`${file.fileName}_role`}
                        size="small"
                        onChange={(e) => setFileMeta({fileName: file.fileName, type: 'role', value: e.target.value})}
                        value={file.role ? file.role : ''}
                        label="Select role"
                      >
                        {fileRoles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell sx={{p: 1}}>
                    <FormControl fullWidth>
                      <InputLabel size="small">Select options</InputLabel>
                      <Select
                        id={`${file.fileName}_process`}
                        size="small"
                        multiple
                        onChange={(e) => setFileMeta({fileName: file.fileName, type: 'process', value: e.target.value})}
                        value={[]}
                        label="Select options"
                      >
                        {fileProcessing.map((processing) => (
                          <MenuItem key={processing.id} value={processing.id}>
                            <Checkbox />
                            <ListItemText primary={processing.label} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                </TableRow>
              )}
            </TableBody>
          </Table>
          {selectedFiles.length === 0 && <Typography p={5} align="center">No files selected</Typography> }
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Files;