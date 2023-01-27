import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.vs.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
        [this.emailValidator],
      ],
      username: ['', [Validators.required, this.vs.noPuedeSerStrider]], //* PARA ENVIAR UN FUNCION SOLO SE ENVIA LA REFERENCIA (SIN () )
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    //* VALIDACIONES DE TODO EL FORMULARIO
    { Validators: [this.vs.camposIguales('password', 'password2')] }
  );

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Jhonatan Soto',
      email: 'test1@test.com',
      username: 'Bautistajhonatan45',
      password: '123456',
      password2: '123456',
    });
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.['required']){
      return 'El email es obligatorio'
    } else if(errors?.['pattern']){
      return 'El valor no tiene formato de correo electronico.'
    } else if(errors?.['emailTomado']){
      return 'El email ya existe.'
    }

    return '';
  }

  campoNoValido(campo: string): boolean | undefined {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  /*  emailRequired() {
    return (
      this.miFormulario.get('email')?.errors?.['required'] &&
      this.miFormulario.get('email')?.touched
    );
  }

  emailPattern() {
    return (
      this.miFormulario.get('email')?.errors?.['pattern'] &&
      this.miFormulario.get('email')?.touched
    );
  }

  emailExiste() {
    return (
      this.miFormulario.get('email')?.errors?.['emailTomado'] &&
      this.miFormulario.get('email')?.touched
    );
  } */

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}
