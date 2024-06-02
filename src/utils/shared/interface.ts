export interface IError {
  message: string;
  stack?: string;
  status?: string;
}

export interface IFileUpload {
  name: string;
  extension: string;
  type: string;
}
