export interface SubmitError {
  status?: string;
  data?: string;
}

export interface SubmitErrorProps {
  isError: boolean;
  error?: SubmitError;
}