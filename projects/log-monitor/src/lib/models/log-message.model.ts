

export interface LogMessage {
  type?: 'LOG' | 'INFO' | 'WARN' | 'ERR';
  time: string;
  message: string;
}

