import { AgendamentoConsultaComponent } from './agendamento-consulta/agendamento-consulta.component';
import { AgendamentoSenhaComponent } from './agendamento-senha/agendamento-senha.component';
import { AgendamentoListFinalComponent } from './agendamento-list-final/agendamento-list-final.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';

const routes: Routes = [
  { path: 'user/:id', component: AgendamentoListComponent },
  { path: 'userFin/:id_agendamento/:id_usuario', component: AgendamentoListFinalComponent },
  { path: 'senha/:id', component: AgendamentoSenhaComponent },
  { path: 'consultar/:cpfCnpj', component: AgendamentoConsultaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoRoutingModule { }
