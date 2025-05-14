import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './service/login.service';
import { WordExportService } from './service/word-export.service';

import { AppRoutingModule } from './app-routing.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExportButtonComponent } from './export-button/export-button.component';
@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserDetailComponent,
    UsersListComponent,
    SearchPipe,
    SortPipe,
    LoginComponent,
    RegisterComponent,
    ExportButtonComponent,

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
  ],
   providers: [
    LoginService,
    WordExportService  // Ajouter les deux services ici dans un tableau
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
