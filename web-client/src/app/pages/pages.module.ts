import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

// Components.
import { NotFoundComponent } from './not-found/not-found.component';

// Modules.
import { AuthentificationModule } from './authentification/authentification.module';
import { ContestModule } from './contest/contest.module';
import { AccountModule } from './account/account.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,

    MatButtonModule,
    MatIconModule,

    AuthentificationModule,

    AccountModule,
    ContestModule
  ],
  declarations: [
    NotFoundComponent
  ],
})
export class PagesModule {}
