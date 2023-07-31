import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { BeforeloginComponent } from './beforelogin/beforelogin.component';
import { LoginComponent } from './beforelogin/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './beforelogin/home/home.component';
import { ComplaintComponent } from './afterlogin/complaint/complaint.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './afterlogin/admin/admin.component';
import { RegisterComponent } from './beforelogin/register/register.component';
import { authGuard } from './auth.guard';
import { adminauthGuard } from './adminauth.guard';

const routes:Routes = [
  {
    path:'login', component :LoginComponent
  },
  {
    path:'', component:HomeComponent
  },
  {
    path: 'register', component:RegisterComponent
  },
  {
    path:'complaint', component: ComplaintComponent, canActivate: [authGuard]
  },
  {
    path:'admin', component: AdminComponent, canActivate: [adminauthGuard]
  },
  // {
  //   path: '',
  //   component: AfterloginComponent,
  //   children:[
  //     {
  //       path:'complaint', component: ComplaintComponent, canActivate: [authGuard]
  //     },
  //     {
  //       path:'admin', component: AdminComponent, canActivate: [authGuard]
  //     },
  //   ]
  // }
]

@NgModule({
  declarations: [
    AppComponent,
    AfterloginComponent,
    BeforeloginComponent,
    LoginComponent,
    HomeComponent,
    ComplaintComponent,
    HeaderComponent,
    AdminComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
