import { useCallback, useState } from 'react';
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

const columns: any = [
  { field: 'fileName', headerName: 'Name' },
  { field: 'readableSize', headerName: 'Size' },
  { field: 'readableType', headerName: 'Type' },
  { field: 'role', headerName: 'Role' },
  { field: 'restricted', headerName: 'Restricted' },
  { field: 'process', headerName: 'Process' },
];

const Files = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [selectedProcessing, setSelectedProcessing] = useState<string[]>([]);

  const onDrop = (acceptedFiles: any) => {
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };

  const handleProcessingChange = (event: SelectChangeEvent<typeof selectedProcessing>) => {
    const {
      target: { value },
    } = event;
    setSelectedProcessing(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: true,
  });

  const deleteFile = (deleteFile: any) => {
    const newFiles = selectedFiles.filter( (file: any) => file.path !== deleteFile.path);
    setSelectedFiles(newFiles);
  }

  const files = selectedFiles.map( (file: any, i: number) => (
    { 
      ...file,
      fileName: file.name,
      id: i,
      readableSize: `${(file.size*9.5367431640625*Math.pow(10, -7)).toFixed(2)} MB`, 
      readableType: file.type.replace(/^.*\/(.*)$/, "$1"), 
      role: <Select
          id={`${file.path}_role`}
          size="small"
        >
          {fileRoles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.label}
            </MenuItem>
          ))}
        </Select>, 
      restricted: <Checkbox/>, 
      process: <Select
          id={`${file.path}_process`}
          size="small"
          multiple
          value={selectedProcessing}
          onChange={handleProcessingChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {fileProcessing.map((processing) => (
            <MenuItem key={processing.id} value={processing.id}>
              <Checkbox checked={selectedProcessing.indexOf(processing.id) > -1} />
              <ListItemText primary={processing.label} />
            </MenuItem>
          ))}
        </Select>
    }
  ));

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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map( (col: any) => <TableCell key={col.field}>{col.headerName}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map( (file: any) =>
                <TableRow key={file.fileName}>
                  <TableCell>
                    <IconButton color="primary" size="small" onClick={() => deleteFile(file)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  {columns.map( (col: any, i: number) => 
                    <TableCell key={`${file.fileName}_${col.field}`} sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: i === 0 ? 200 : 'auto', overflow: 'hidden'}}>
                      {file[col.field]}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          {files.length === 0 && <Typography p={5} align="center">No files selected</Typography> }
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Files;