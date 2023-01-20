import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue], //* EVALUAR TRUE
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario.reset(this.persona);

    //* UNA SOLA  PROPIEDAD
    this.miFormulario.get('condiciones')?.valueChanges.subscribe((newValue) => {
      console.log(newValue);
    });

    //* TODO EL FORMULARIO
    this.miFormulario.valueChanges.subscribe((form) => {
      console.log(form);
    });

    //* DESTRUCTURANDO EL FORMULARIO
    this.miFormulario.valueChanges.subscribe(({ condiciones, ...rest }) => {
      // delete form.condiciones;
      this.persona = rest;
    });
  }

  guardar() {
    const formValue = this.miFormulario.value;
    delete formValue.condiciones;

    this.persona = formValue;
  }
}
