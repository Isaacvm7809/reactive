import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ValidadoresService } from '../services/validadores.service';

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.css']
})
export class ReactivoComponent {
  forma: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataForm();
  }

  get getPasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  
  get getUsuarioValido() {
    return (this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched === true) ? true : false;
  }
  get getNombreValido() {
    return (this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched === true) ? true : false;
  }
  get getApellidoValido() {
    return (this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched === true) ? true : false;
  }
  get getCorreoValido() {
    return (this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched === true) ? true : false;
  }
  get getDistritoValido() {
    return (this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched === true) ? true : false;
  }
  get getCiudadValido() {
    return (this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched === true) ? true : false;
  }
  get getPass1() {
    return (this.forma.get('contraseña.pass1')?.invalid && this.forma.get('contraseña.pass1')?.touched === true) ? true : false;
  }
  get getPass2() {
    const pass1 = this.forma.get('contraseña.pass1')?.value ;
    const pass2 = this.forma.get('contraseña.pass2')?.value;
    return (pass1 === pass2)? false: true;
  }

  private crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), this.validadores.noIsaac()    ]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')]],
      usuario: ['', , this.validadores.usernameValidator() ],
      direccion: this.fb.group({
        distrito: ['', [Validators.required]],
        ciudad: ['', [Validators.required, Validators.minLength(3)]]
      }),
      pasatiempos: this.fb.array([]),
      contraseña: this.fb.group({
        pass1: ['', [Validators.required, Validators.minLength(5)]],
        pass2: ['', [Validators.required, Validators.minLength(5)]]
      }),
    },{ 
      validators : this.validadores.validadoresIguales('contraseña.pass1','contraseña.pass2')  ,
    });
  }


  guardarPasatiempo(){
    this.getPasatiempos.push(this.fb.control('', Validators.required) );
  }
  
  borrarPasatiempo(i : number){
    this.getPasatiempos.removeAt(i);
  }


  guardar() {
    if (this.forma.invalid) {
      return (Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched())
        }
        else {
          control.markAsTouched();
        }
      })
      )
    }
    //Después de guardar
    this.forma.reset();
  }

  cargarDataForm() {
    this.forma.reset({
      nombre: 'Isaac',
      apellido: 'Vasquez',
      correo: 'isaacvm780923@gmail.com',
      direccion: {
        distrito: 'Distrito51',
        ciudad: 'Tuxtla Gutiérrez'
      },
      contraseña: {
        pass1: 'Distrito51',
        pass2: 'Distrito51'
      }
    });
    //Add data
    // ['Comer', 'Dormir'].forEach( valor=> this.getPasatiempos.push(this.fb.control(valor)) );

  }



}

