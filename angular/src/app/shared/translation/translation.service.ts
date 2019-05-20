import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export enum Language {
  FRENCH = 'fr',
  ENGLISH = 'en'
}

@Injectable()
export class TranslationService {

  constructor(private readonly translate: TranslateService) {}

  setLanguage(language: Language) {
    this.translate.use(language);
  }
}
