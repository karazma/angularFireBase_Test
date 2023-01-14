import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

//Routing Module 
import { AppRoutingModule } from './app-routing.module';

//Authentication 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//Angular Form Plugin
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Message Queue
import { HttpClientModule } from "@angular/common/http";

//Custom Modules
//import { UploadDialogComponent, DialogOverviewExampleDialog } from './upload-dialog/upload-dialog.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component'

//Environment 
import { environment } from 'src/environments/environment';

//Fire Base Plugin
import { AngularFireModule  } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//Material UI Plugin
// import { MatGridListModule} from "@angular/material/grid-list";
// import {  MatDialogModule } from '@angular/material/dialog';
// import {  MatNativeDateModule } from '@angular/material/core';
// import { BrowserAnimationsModule,NoopAnimationsModule  } from '@angular/platform-browser/animations';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    //UploadDialogComponent,
    //DialogOverviewExampleDialog,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //Fire base Initialization
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  //bootstrap: [AppComponent, UploadDialogComponent],
  schemas: [
    //to avoid the clause error against with the angular UI for Material UI
    CUSTOM_ELEMENTS_SCHEMA,
    
  ],
})
export class AppModule { }
