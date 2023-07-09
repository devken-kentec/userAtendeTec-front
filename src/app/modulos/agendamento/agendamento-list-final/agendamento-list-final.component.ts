import { GlobalService } from './../../shared/global.service';
import { CadastroUsuarioService } from './../../cadastro-usuario/shared/cadastro-usuario.service';
import { AgendamentoService } from './../shared/agendamento.service';
import { DetalhamentoServico } from './../shared/detalhamento-servico';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-agendamento-list-final',
  templateUrl: './agendamento-list-final.component.html',
  styleUrls: ['./agendamento-list-final.component.css'],
  preserveWhitespaces: true
})
export class AgendamentoListFinalComponent implements OnInit {

  agendForm: FormGroup;
  id: number = 0;
  nome: string = "";
  cpfCnpj: string = "";
  email: string = "";
  telefone: string = "";
  id_agendamento: number = 0;
  unidade: String = "";
  data: string = '';
  horario: string = '';
  especifico: string = '';
  status: string = '';
  btn: boolean = true;
  detalhamentoServicos: DetalhamentoServico[];

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private router: Router,
    private cadastroService: CadastroUsuarioService,
    public globalService: GlobalService) { }

  ngOnInit(): void {

    const routeParans = this.route.snapshot.params;

      if(routeParans.id_usuario != null){
        this.cadastroService.loadById(routeParans.id_usuario).subscribe((usuario: any)=>{
            this.id = usuario.id;
            this.nome = usuario.nome;
            this.cpfCnpj = usuario.cpfCnpj;
            this.email = usuario.email;
            this.telefone = usuario.fone;
            this.agendForm.get('contribuinte').setValue(this.id.toString());
        });

        if(routeParans.id_agendamento != null){
          this.agendamentoService.loadById(routeParans.id_agendamento).subscribe((agenda: any)=>{
            this.id_agendamento = agenda.id
            this.unidade = agenda.grade.unidade.descricao;
            this.horario = agenda.horario;
            this.data = agenda.grade.calendario.dia;
            this.especifico = agenda.grade.servico.descricao;
            this.status =  agenda.statusAgendamento;
            this.combobox(agenda.grade.servico.descricao);
            this.agendForm.get('id').setValue(this.id_agendamento.toString());
          });
        }
      }

    this.agendForm = this.fb.group({
      id: ["", []],
      contribuinte: ["", []],
      detalhamentoServico: ["", []],
      prioridade: ["", []],
      aceite: ["", [Validators.required]]
  });
  }

  combobox(servico){
    this.agendamentoService.listDetalhamentoServico(servico).subscribe(
      dados => this.detalhamentoServicos = dados
    );
  }

  enviar(){
      if(this.agendForm.valid){
        this.btn = !this.btn;
        this.agendamentoService.enviar(this.agendForm.value).subscribe(
          success => {
            this.globalService.saveShow("Enviado com Sucesso!", "Pedido");
        });
    }
  }

    imprimir(id){
     this.router.navigate(['agendamento/senha', id]);
     /*let url: string = "http://localhost:4900/agendamento/senha"+"/"+id;
     window.open(url, "Teste", "resizable,scrollbars,status");*/
    }
}
