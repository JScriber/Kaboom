import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Angular material components.
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar'; 

// Layout components.
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';

// Modules.
import { WebServiceModule } from '../web-service/web-service.module';

// Services.
import { SidenavService } from './services/sidenav.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,

    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,

    WebServiceModule
  ],
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    FooterComponent
  ],
  providers: [
    SidenavService
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent,
    FooterComponent
  ]
})
export class LayoutsModule {}
