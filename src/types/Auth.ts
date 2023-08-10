export interface SetAuthProvider {
  authority: string;
  client_id: string;
  scope?: string;
}

export interface AuthState extends SetAuthProvider {
  redirect_uri: string;
  loadUserInfo: boolean;
}

export type AuthProvider = 'SURF' | 'SRAM' | 'Google' | 'GitHub';
