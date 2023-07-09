import { GlobalService } from './../../shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { AgendamentoService } from './../shared/agendamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento-senha',
  templateUrl: './agendamento-senha.component.html',
  styleUrls: ['./agendamento-senha.component.css'],
  preserveWhitespaces: true
})
export class AgendamentoSenhaComponent implements OnInit {

  identificador: number;
  senha: string;
  nome: string;
  cpfCnpj: string;
  unidade: string;
  endereco: string;
  data: string;
  horario: string;
  servico: string;
  detalhamentoServico: string;
  statusAgendamento: string;
  prioridade: string;
  resultado: string;

  constructor(private agendamentoService: AgendamentoService,
              private route: ActivatedRoute,
              protected globalService: GlobalService) { }

  ngOnInit(): void {
    this.dataAtual();
    const params = this.route.snapshot.params;
    if(params.id){
      this.senhaById(params.id);
    }
  }

  senhaById(id){
    this.agendamentoService.senhaById(id).subscribe((senha: any)=>{
          this.identificador = senha.identificador;
          this.senha = senha.senha;
          this.nome = senha.nome;
          this.cpfCnpj = this.globalService.formatarPessoas(senha.cpfCnpj);
          this.unidade = senha.unidade;
          this.endereco = senha.endereco;
          this.data = senha.data;
          this.horario = senha.horario;
          this.servico = senha.servico;
          this.detalhamentoServico = senha.detalhamentoServico;
          this.statusAgendamento = senha.statusAgendamento;
          this.prioridade = senha.prioridade;
    });
  }

  imprimir(){
    print();
  }

  dataAtual(){
      var data = new Date();
      var dia = data.getDate();
      var mes = data.getMonth();
      var ano = data.getFullYear();

      var meses = new Array(
           'janeiro','fevereiro','março','abril','maio','junho','julho','agosto',
           'setembro','outubro','novembro','dezembro'
          );

       this.resultado = "Goiânia, " + dia + ' de ' + meses[mes] + ' de ' + ano +'.' ;
    }
}
