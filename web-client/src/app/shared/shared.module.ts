import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Services.
import { TranslationService } from './translation/translation.service';

// Modules.
import { NotificationModule } from './notification/notification.module';
import { FormModule } from './form/form.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,

    FormModule,
    TranslateModule,
    NotificationModule
  ],
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [
    TranslationService
  ]
})
export class SharedModule {}
