import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from './form/form.module';
import { TranslationService } from './translation/translation.service';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    TranslateModule
  ],
  declarations: [],
  exports: [],
  providers: [
    TranslationService
  ]
})
export class SharedModule {}
