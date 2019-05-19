import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Angular material components.
import { MatToolbarModule, MatIconModule, MatListModule, MatDividerModule, MatRippleModule, MatMenuModule, MatButtonModule } from '@angular/material'; 

// Layout components.
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';

// Modules.
import { WebServiceModule } from '../web-service/web-service.module';

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
  exports: [
    SidenavComponent,
    ToolbarComponent,
    FooterComponent
  ]
})
export class LayoutsModule {}
