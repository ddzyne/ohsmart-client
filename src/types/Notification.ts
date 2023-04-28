import type {ReactNode} from 'react';

export type NotificationTypes = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationTypes;
}

export interface NotificationState {
  open: boolean;
  data?: Notification;
}