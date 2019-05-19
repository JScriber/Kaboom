import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { mockService } from 'src/utils';

import { JsonConverterService } from './json-converter/json-converter.service';
import { AuthentificationService } from './authentification/authentification.service';
import { UserSignApiService } from './user-sign/api/user-sign-api.service';
import { MockUserSignApiService } from './user-sign/mock/mock-user-sign-api.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthGuardService,
    JsonConverterService,
    AuthentificationService,
    mockService(UserSignApiService, MockUserSignApiService)
  ]
})
export class WebServiceModule {}
