import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ AngularFireAuth} from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registrarUsuario: FormGroup;

  constructor(private fb:FormBuilder, 
              private auth:AngularFireAuth, 
              private toastr: ToastrService,
              private router:Router) { 
    this.registrarUsuario = this.fb.group({ //esto es un FormGroup
      email:['', Validators.required],
      password:['', Validators.required],
      repetirPassword:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  registrar(){
    const mail = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    
    if(password != repetirPassword) {
      this.toastr.error("Las contraseñas no coinciden.", "¡Error!");
    }
    else
    {
      this.auth.createUserWithEmailAndPassword(mail, password).then((user) => {
        this.router.navigate(['/login']);
        this.toastr.success("Usuario creado con éxito.");
        console.log("el user: ", user);

      }).catch((error) => {
        this.toastr.error(this.firebaseError(error.code),'¡Error!');
        console.log("el error: ", error);
      });
    }
    //console.log(mail, password, repetirPassword);
    //console.log("el form envía:",  this.registrarUsuario);
  }

  firebaseError(error:string)
  {
    switch(error){
    case 'auth/email-already-in-use':
      return "El usuario ya existe :(";
       break;
    case 'auth/weak-password':
      return "La contraseña debe tener al menos 6 caracteres.";
       break;  
    case 'auth/invalid-email':
      return "Introduzca un mail válido";
       break;  
    default:
      return "error desconocido";
       break;
    }
  }



}
