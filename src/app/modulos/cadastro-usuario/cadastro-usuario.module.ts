import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CadastroUsuarioRoutingModule } from './cadastro-usuario-routing.module';
import { CadastroUsuarioFormComponent } from './cadastro-usuario-form/cadastro-usuario-form.component';


@NgModule({
  declarations: [CadastroUsuarioFormComponent],
  imports: [
    CommonModule,
    CadastroUsuarioRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class CadastroUsuarioModule { }
