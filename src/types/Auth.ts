export interface AuthConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  loadUserInfo: boolean;
  client_secret?: string;
  response_type: string;
}

export type AuthProvider = 'SURF' | 'SRAM' | 'Google' | 'GitHub';
