import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginUsuario: FormGroup;
  constructor(private fb:FormBuilder, 
              private auth:AngularFireAuth, 
              private toastr: ToastrService,
              private router:Router) { 
this.loginUsuario = this.fb.group({ //esto es un FormGroup
email:['', Validators.required],
password:['', Validators.required],
})
}
  ngOnInit(): void {
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;  

    this.auth.signInWithEmailAndPassword(email, password).then((user)=> {
      this.router.navigate(['/home']);
    }).catch((error) => {
        this.toastr.error(this.firebaseError(error.code),'¡Error!');
        console.log("el error: ", error);
      });
  
    //console.log(mail, password, repetirPassword);
    //console.log("el form envía:",  this.registrarUsuario);
  }

  firebaseError(error:string)
  {
    switch(error){
    case 'auth/wrong-password':
      return "Datos incorrectos.";
       break;
    case 'auth/user-not-found':
      return "Datos incorrectos.";
       break;  
    case 'auth/invalid-email':
      return "Introduzca un mail válido";
       break;  
    default:
      return "Error desconocido";
       break;
    }
  }
}
