import { Language } from 'src/translation/translation';

export interface User {
  username: string;
  email: string;
  language: Language;
}
