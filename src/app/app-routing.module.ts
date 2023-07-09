import { AuthGuard } from './modulos/guard/auth-guard';
import { } from './modulos/cadastro-usuario/cadastro-usuario.module';
import { } from './modulos/agendamento/agendamento.module';
import { } from './modulos/login/login.module';
import { } from './modulos/avaliacao/avaliacao.module';
import { } from './modulos/home/home.module';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'usuario', loadChildren: './modulos/cadastro-usuario/cadastro-usuario.module#CadastroUsuarioModule'},
  { path: 'agendamento', loadChildren: './modulos/agendamento/agendamento.module#AgendamentoModule', canActivate:[AuthGuard] },
  { path: 'login', loadChildren: './modulos/login/login.module#LoginModule' },
  { path: 'avaliacao', loadChildren: './modulos/avaliacao/avaliacao.module#AvaliacaoModule', canActivate:[AuthGuard] },
  { path: 'home', loadChildren: './modulos/home/home.module#HomeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
