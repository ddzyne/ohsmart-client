import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from 'react-i18next';
import type { StatusIconProps } from '../../types/Generic';
import { styled } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 0,
    boxShadow: theme.shadows[1],
  },
}));

export const StatusIcon = ({status, title, margin}: StatusIconProps) => {
  const { t } = useTranslation('generic');
  const iconSx = {
    cursor: 'help', 
    mr: margin === 'r' || margin === 'lr' ? 1 : 0, ml: margin === 'l' || margin === 'lr' ? 1 : 0,
  }

  return (
    <LightTooltip
      title={
        <>
          {title && 
            <Typography 
              sx={{
                fontSize: 14, 
                p: 2
              }}
            >
              {title}
            </Typography>
          }
            <Typography
              sx={{
                fontSize: 12, 
                pl: 2,
                pr: 2,
                pb: 1,
                pt: 1, 
                backgroundColor: `${status}.main`,
              }}
            >
              {t(status as string)}
            </Typography>
        </>
      }>
      {
        status === 'error' ?
        <ErrorIcon sx={iconSx} color={status} /> :
        status === 'warning' ?
        <InfoIcon sx={iconSx} color={status}/> :
        <CheckCircleIcon sx={iconSx} color={status}/>
      }
    </LightTooltip>
  )
}