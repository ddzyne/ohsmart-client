export interface AuthProvider {
  authority: string;
  client_id: string;
  scope: string;
  redirect_uri: string;
  loadUserInfo: boolean;
}