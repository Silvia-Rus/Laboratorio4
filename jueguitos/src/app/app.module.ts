import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modulos
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule  } from "@angular/fire/compat";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

//componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { LoginComponent } from './login/login.component';
import { JuegosComponent } from './juegos/juegos.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { environment } from 'src/environments/environment';

const appRoutes:Routes=[
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'quiensoy', component:QuienSoyComponent},
  {path: 'jueguitos', component:JuegosComponent},
  {path: 'recuperarpassword', component:RecuperarPasswordComponent},
  {path: 'registro', component:RegistroComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuienSoyComponent,
    LoginComponent,
    JuegosComponent,
    RegistroComponent,
    RecuperarPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
