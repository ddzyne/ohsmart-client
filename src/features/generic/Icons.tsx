import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import type { StatusIconProps } from '../../types/Generic';

export const StatusIcon = ({status, title, margin}: StatusIconProps) => {
  const statusTitle = 
    status === 'error' ? 
    'Needs some more information' : 
    status === 'warning' ? 
    'Could be better' : 
    'Good to go';

  const iconSx = {
    cursor: 'help', 
    mr: margin === 'r' || margin === 'lr' ? 1 : 0, ml: margin === 'l' || margin === 'lr' ? 1 : 0,
  }

  return (
    <Tooltip
      title={
        <>
          {title && <Typography sx={{mb: 1, p: 1}}>{title}</Typography>}
          {title && <hr/>}
          <Typography sx={{fontSize: 12, p: 1}}>Status: {statusTitle}</Typography>
        </>
      }>
      {
        status === 'error' ?
        <ErrorIcon sx={iconSx} color={status} /> :
        status === 'warning' ?
        <InfoIcon sx={iconSx} color={status}/> :
        <CheckCircleIcon sx={iconSx} color={status}/>
      }
    </Tooltip>
  )
}