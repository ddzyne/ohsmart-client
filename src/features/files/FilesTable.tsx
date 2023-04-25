import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getFiles, removeFile, setFileMeta } from './filesSlice';
import fileRoles from '../../config/files/roles';
import fileProcessing from '../../config/files/processing';
import type { FileColumn, SelectedFile } from '../../types/Files';

const columns: FileColumn[] = [ 'fileName', 'readableSize', 'readableType' ];

const FilesTable = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('files');
  const selectedFiles = useAppSelector<SelectedFile[]>(getFiles);

  return (
    selectedFiles.length !== 0 ?
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{p: 1, width: 10}}/>
            {columns.map( (col) => <TableCell sx={{p: 1}} key={col}>{t(col)}</TableCell>)}
            <TableCell sx={{p: 1, width: 10}}>{t('private')}</TableCell>
            <TableCell sx={{p: 1, width: 230}}>{t('role')}</TableCell>
            <TableCell sx={{p: 1, width: 280}}>{t('processing')}</TableCell>
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
                  key={`${file.fileName}_${col}`} 
                  sx={{ p: 1, textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: i === 0 ? 200 : 'auto', overflow: 'hidden'}}
                >
                  {file[col]}
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

export default FilesTable;