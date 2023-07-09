import { AvaliacaoConsultaComponent } from './avaliacao-consulta/avaliacao-consulta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'consultar/:cpfCnpj', component: AvaliacaoConsultaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoRoutingModule { }
