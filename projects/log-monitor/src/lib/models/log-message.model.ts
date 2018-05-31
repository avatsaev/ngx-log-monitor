export interface LogMessage {
  type?: 'LOG' | 'INFO' | 'WARN' | 'ERR' | 'SUCCESS';
  timestamp?: string;
  message: string;
}
