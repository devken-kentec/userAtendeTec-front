import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from './../../shared/global.service';
import { AgendamentoService } from './../../agendamento/shared/agendamento.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../../agendamento/shared/agendamento';
import { AvaliacaoService } from '../shared/avaliacao.service';
import { Avaliacao } from '../shared/avaliacao';

@Component({
  selector: 'app-avaliacao-consulta',
  templateUrl: './avaliacao-consulta.component.html',
  styleUrls: ['./avaliacao-consulta.component.css']
})
export class AvaliacaoConsultaComponent implements OnInit {

  avaliacaoForm: FormGroup;
  agendamentos: Agendamento[];
  avaliacoes: Avaliacao[];
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
  id: string;
  identificador: string;
  data: string;
  detalhamentoServico: string;
  guiche: string;
  matricula: string;
  servidor: string;
  confirmar: boolean = false;
  btnAvaliar: boolean = true;
  msgNull: boolean = false;

  constructor(private route: ActivatedRoute,
              private agendamentoService: AgendamentoService,
              private fb: FormBuilder,
              private avaliacaoService: AvaliacaoService,
              public globalService: GlobalService
              ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.findByCpfCnpj(routeParams.cpfCnpj);

    this.avaliacaoForm = this.fb.group({
      nota: ['',[Validators.required]]
    });
  }

  detalharAvaliacao(identificador){
    this.btnAvaliar = true;
    this.limpaModal();
    this.msgNull = false;
    this.avaliacaoService.findByIdentificador(identificador).subscribe((dados: any)=>{

      if(dados != null){
          this.id = dados.id;
          this.identificador = dados.identificador;
          this.senha = dados.senha;
          this.data = dados.data;
          this.horario = dados.horario;
          this.unidade = dados.unidade;
          this.servico = dados.servico;
          this.detalhamentoServico = dados.detalhamentoServico;
          this.nome = dados.nome;
          this.cpfCnpj = this.globalService.formatarPessoas(dados.cpfCnpj);
          this.guiche = dados.atendente.guiche.descricao;
          this.matricula = dados.atendente.acesso.servidor.matricula;
          this.servidor = dados.atendente.acesso.servidor.nome;
      } else {
        this.msgNull = true
      }
    });
  }

  limpaModal(){
    this.id = "";
    this.identificador = "";
    this.senha = "";
    this.data = "";
    this.horario = "";
    this.unidade = "";
    this.servico = "";
    this.detalhamentoServico = "";
    this.nome = "";
    this.cpfCnpj = "";
    this.guiche = "";
    this.matricula = "";
    this.servidor = "";
  }

  findByCpfCnpj(cpfCnpj){
    if(cpfCnpj != null){
      this.avaliacaoService.listAgendamentoCpfCnpjAtivado(cpfCnpj).subscribe(
        dados  =>  this.avaliacoes = dados
      );
    }
  }

  avaliar(){
    this.btnAvaliar = !this.btnAvaliar;
    let nota = this.avaliacaoForm.get('nota').value;
    this.avaliacaoService.avaliar(this.id, this.identificador, nota).subscribe(
      success => { this.globalService.saveShow("Realizada com Sucesso!", "Avaliação"); }
    );
    this.avaliacaoForm.reset();
  }

}
