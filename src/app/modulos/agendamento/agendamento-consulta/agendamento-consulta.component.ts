import { GlobalService } from './../../shared/global.service';
import { AgendamentoService } from './../shared/agendamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../shared/agendamento';

@Component({
  selector: 'app-agendamento-consulta',
  templateUrl: './agendamento-consulta.component.html',
  styleUrls: ['./agendamento-consulta.component.css'],
  preserveWhitespaces: true
})
export class AgendamentoConsultaComponent implements OnInit {

  agendamentos: Agendamento[];
  senha: string;
  horario: string;
  dia: string;
  nome: string;
  cpfCnpj: string;
  cpfCnpjLimpo: string;
  servico: string;
  detalhamento: string;
  unidade: string;
  end: string;
  statusAgendamento: string;
  identificador: string;
  diaCancelamento: string;
  senhaCancelamento: string;
  idAgendamentoCancelamento: string;

  constructor(private route: ActivatedRoute,
              private agendamentoService: AgendamentoService,
              public globalService: GlobalService
              ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.findByCpfCnpj(routeParams.cpfCnpj);
  }

  detalhar(id){
    this.agendamentoService.loadById(id).subscribe(
      (dados: any) =>{
        this.identificador = dados.id;
        this.senha = dados.senha;
        this.horario = dados.horario;
        this.dia = this.globalService.formatarDate(dados.grade.calendario.dia);
        this.nome = dados.contribuinte.nome;
        this.cpfCnpj = this.globalService.formatarPessoas(dados.contribuinte.cpfCnpj);
        this.cpfCnpjLimpo = dados.contribuinte.cpfCnpj;
        this.servico = dados.grade.servico.descricao;
        this.detalhamento = dados.detalhamentoServico.descricao;
        this.unidade = dados.grade.unidade.descricao;
        this.end = dados.grade.unidade.endereco;
        this.statusAgendamento = dados.statusAgendamento;
      }
    );
  }

  pegarDados(id, dia, senha){

    this.diaCancelamento = dia;
    this.senhaCancelamento = senha;
    this.idAgendamentoCancelamento = id;

  }

  cancelar(){
    this.agendamentoService.liberarAgendamento(this.idAgendamentoCancelamento).subscribe(dados =>
      this.globalService.saveShow('Cancelado com Sucesso!','Agendamento')
    );
  }

  findByCpfCnpj(cpfCnpj){
    if(cpfCnpj != null){
      this.agendamentoService.listAgenamento(cpfCnpj).subscribe(
        dados  =>  this.agendamentos = dados
      );
    }
  }

}
