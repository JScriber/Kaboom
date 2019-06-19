import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationsService } from './services/form-validations.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatInputModule
  ],
  declarations: [
  ],
  providers: [
    FormValidationsService
  ]
})
export class FormModule {}
