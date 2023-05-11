import type { SectionStatus} from './Metadata';

export interface StatusIconProps {
  status?: SectionStatus;
  title?: string;
  margin?: 'l' | 'r' | 'lr';
}
