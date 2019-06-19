import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { rootRoutes } from './root.routes';

import { MatSidenavModule } from '@angular/material/sidenav'; 

// Local modules.
import { PagesModule } from './pages/pages.module';
import { LayoutsModule } from './layouts/layouts.module';
import { WebServiceModule } from './web-service/web-service.module';

/** Mandatory for translations. */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRoutes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    }),

    MatSidenavModule,

    PagesModule,
    LayoutsModule,
    WebServiceModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
