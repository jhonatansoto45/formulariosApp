import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      ],
      username: ['', [Validators.required, this.vs.noPuedeSerStrider]], //* PARA ENVIAR UN FUNCION SOLO SE ENVIA LA REFERENCIA (SIN () )
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwaor2: ['', [Validators.required]],
    },
    //* VALIDACIONES DE TODO EL FORMULARIO
    { Validators: [this.vs.camposIguales('password', 'password2')] }
  );

  constructor(private fb: FormBuilder, private vs: ValidatorService) {}

  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: 'Jhonatan Soto',
      email: 'test@test.com',
      username: 'Bautistajhonatan45',
    });
  }

  campoNoValido(campo: string): boolean | undefined {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}
