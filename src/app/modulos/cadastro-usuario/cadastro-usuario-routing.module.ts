import { CadastroUsuarioFormComponent } from './cadastro-usuario-form/cadastro-usuario-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '' , component: CadastroUsuarioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroUsuarioRoutingModule { }
