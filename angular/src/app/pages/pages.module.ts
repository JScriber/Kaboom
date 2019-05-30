import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

// Components.
import { NotFoundComponent } from './not-found/not-found.component';

// Modules.
import { AuthentificationModule } from './authentification/authentification.module';
import { GameModule } from './game/game.module';
import { AccountModule } from './account/account.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,

    MatButtonModule,
    MatIconModule,

    AuthentificationModule,
    GameModule,
    AccountModule
  ],
  declarations: [
    NotFoundComponent
  ],
})
export class PagesModule {}
