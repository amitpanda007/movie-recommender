import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule  } from "@angular/common/http"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

import { AppComponent } from './app.component';
import { SuccessSnackbar, ErrorSnackbar } from './common/snackbar.component';
import { MoviesModule } from './movies/movies.module';


@NgModule({
  declarations: [
    AppComponent,
    SuccessSnackbar,
    ErrorSnackbar
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    SharedModule,
    CoreModule,
    MoviesModule
  ],
  entryComponents: [SuccessSnackbar, ErrorSnackbar],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
