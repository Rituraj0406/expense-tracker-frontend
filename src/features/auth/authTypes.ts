export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  phone?: string;
  currency?: string;
  language?: string;
}

export interface Preference {
  defaultBudget: number,
  rollover: boolean,
  warningThreshold: number,
  theme: string,
  accentColor: string,
  density: string
}