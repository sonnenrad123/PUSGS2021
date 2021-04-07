import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularMaterialModule } from './angular-material/angular-material.module'


import { TestComponentComponent } from './test-component/test-component.component';
import { TestComponent2Component } from './test-component2/test-component2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { InputImageComponent } from './utilities/input-image/input-image/input-image.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    TestComponentComponent,
    TestComponent2Component,
    RegisterComponent,
    InputImageComponent,
    HomeComponent,
    LoginComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
