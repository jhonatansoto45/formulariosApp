import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'RTX 4080ti',
    precio: 10,
    existencias: 10,
  };

  constructor() {}

  ngOnInit(): void {}

  //* ALTERNATIVA
  /* guardar(miFormulario: NgForm): void {
    console.log(miFormulario);
  } */

  nombreValido(): boolean {
    return (
      this.miFormulario?.controls['producto']?.invalid &&
      this.miFormulario?.controls['producto']?.touched
    );
  }

  precioValido(): boolean {
    return (
      this.miFormulario?.controls['precio']?.touched &&
      this.miFormulario?.controls['precio']?.value <= 0
    );
  }

  guardar(): void {
    //console.log(this.miFormulario);
    console.log('Posteo correcto');

    //this.miFormulario.resetForm();// * LIMPIAR EL FORMULARIO
    this.miFormulario.resetForm({
      //* LIMPIAR EL FORMULARIO E INICIALIZA LOS CAMPOS
      producto: 'Algo',
      precio: 0,
      existencias: 0,
    });
  }
}
