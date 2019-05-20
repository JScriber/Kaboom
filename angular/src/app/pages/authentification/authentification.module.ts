import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatMenuModule } from '@angular/material';

// Components.
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

// Modules.
import { SharedModule } from '../../shared/shared.module';
import { WebServiceModule } from '../../web-service/web-service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,

    WebServiceModule,
    SharedModule,
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  providers: []
})
export class AuthentificationModule {}
