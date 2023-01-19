import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [``],
})
export class BasicosComponent implements OnInit {
  /* //* INICIALIZA UN FORMGROUP Y FORMCONTROL
  miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl('RTX 4080ti'), //* ITEM
    precio: new FormControl(1500),
    existencias: new FormControl(5),
  }); */

  //* FORMBUILDER
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]], //* [valor, validador sincrono, validador asincrono],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: 'RTX 4080ti',
      precio: 1600,
      existencias: 10,
    });
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched(); //* TOCA TODO LOS CAMPOS ACTIVANDO LOS ERRORES
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
