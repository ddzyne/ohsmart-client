import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useAppDispatch } from '../../app/hooks';
import { addField, deleteField } from './metadataSlice';
import type { FieldButtonProps } from '../../types/Metadata';

export const DeleteButton = ({sectionIndex, groupedFieldId, deleteFieldIndex, size = 'small'}: FieldButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Tooltip title="Remove">
      <IconButton 
        color="error" 
        aria-label="Remove" 
        size={size} 
        onClick={() => dispatch(
          deleteField({
            sectionIndex: sectionIndex, 
            groupedFieldId: groupedFieldId, 
            deleteField: deleteFieldIndex,
          })
        )}>
        <RemoveCircleOutlineIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  )
}

export const AddButton = ({sectionIndex, groupedFieldId, type, size = 'small'}: FieldButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Tooltip title="Add another">
      <IconButton 
        color="primary" 
        aria-label="Add another" 
        size={size} 
        onClick={() => dispatch(
          addField({
            sectionIndex: sectionIndex, 
            groupedFieldId: groupedFieldId,
            type: type,
          })
        )}>
        <AddCircleOutlineIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  )
}

export const AddButtonText = ({sectionIndex, groupedFieldId, type, size = 'medium'}: FieldButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button 
      onClick={() => dispatch(addField({
        sectionIndex: sectionIndex,
        groupedFieldId: groupedFieldId,
        type: type,
      }))} 
      size={size} 
      startIcon={<AddCircleOutlineIcon />}
    >
      Add another
    </Button>
  )
}