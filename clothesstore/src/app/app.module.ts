import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PageNotFoundComponent } from '@pageNotFound/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from '@appShared/interceptors/interceptor.service';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from '@appShared/shared.module';
import { AppComponent } from '@app/app.component';
import localSpCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
import { HomeModule } from '@home/home.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localSpCo);

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    HomeModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
