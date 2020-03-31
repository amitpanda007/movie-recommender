import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule  } from "@angular/common/http"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies/movies.list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './services/auth.service';
import { NavComponent } from './nav/nav.component';
import { SuccessSnackbar, ErrorSnackbar } from './common/snackbar.component';
import { FilterMoviesComponent } from './movies/movies.filter.component';
import { SharedModule } from './shared/shared.module';
import { MoviesPaginationComponent } from './movies/movies.pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    SuccessSnackbar,
    ErrorSnackbar,
    FilterMoviesComponent,
    MoviesPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    SharedModule
  ],
  entryComponents: [SuccessSnackbar, ErrorSnackbar],
  providers: [AuthService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
