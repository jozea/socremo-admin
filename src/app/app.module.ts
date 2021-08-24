import { interceptorProviders } from './interceptors/interceptors';
import { SecureModule } from './pages/secure/secure.module';
import { AuthModule } from './pages/auth/auth.module';
import { AuthService } from './services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient  } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    AuthModule,
    SecureModule,
    
  ],
  providers: [
    interceptorProviders,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
