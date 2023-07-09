import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoRoutingModule } from './avaliacao-routing.module';
import { AvaliacaoConsultaComponent } from './avaliacao-consulta/avaliacao-consulta.component';


@NgModule({
  declarations: [AvaliacaoConsultaComponent],
  imports: [
    CommonModule,
    AvaliacaoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AvaliacaoModule { }
