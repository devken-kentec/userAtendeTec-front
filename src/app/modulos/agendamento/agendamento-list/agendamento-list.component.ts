import { AvaliacaoService } from './../../avaliacao/shared/avaliacao.service';
import { GlobalService } from './../../shared/global.service';
import { Agendamento } from './../shared/agendamento';
import { Calendario } from './../shared/calendario';
import { Unidade } from './../shared/unidade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroUsuarioService } from '../../cadastro-usuario/shared/cadastro-usuario.service';
import { AgendamentoService } from '../shared/agendamento.service';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.css'],
  preserveWhitespaces: true
})
export class AgendamentoListComponent implements OnInit {

  agendForm: FormGroup;
  id: number = 0;
  nome: string = "";
  cpfCnpj: string = "";
  email: string = "";
  telefone: string = "";
  unidades: Unidade[];
  calendarios: Calendario[];
  agendamentos: Agendamento[];
  cont: number = 0;
  btnAgendar: boolean = false;

  constructor(private route: ActivatedRoute,
              private cadastroService: CadastroUsuarioService,
              private fb: FormBuilder,
              private agendamentoService: AgendamentoService,
              private router: Router,
              public globalService: GlobalService,
              private avaliacaoService: AvaliacaoService ) { }

  ngOnInit(): void {

    this.comboBox();

    const routeParans = this.route.snapshot.params;

      if(routeParans.id != null){
        this.cadastroService.loadById(routeParans.id).subscribe((usuario: any)=>{
            this.id = usuario.id;
            this.nome = usuario.nome;
            this.cpfCnpj = usuario.cpfCnpj;
            this.email = usuario.email;
            this.telefone = usuario.fone;
            this.contador();
        });
      }

      this.agendForm = this.fb.group({
          calendario: ["", [Validators.required]],
          unidade: ["", [Validators.required]]
      });

  }

    verAgenda(){
      let calendario = this.agendForm.get('calendario').value;
      let unidade = this.agendForm.get('unidade').value;

      this.agendamentoService.agendaContribuinte(calendario, unidade).subscribe(
        dados => this.agendamentos = dados
      );
    }

    agendar(id_agenda){
      this.router.navigate(['agendamento/userFin',  id_agenda,  this.id]);
    }

    comboBox(){
      this.agendamentoService.listCalendario().subscribe(
        dados=> this.calendarios = dados
      );

      this.agendamentoService.listUnidade().subscribe(
        dados=> this.unidades = dados
      );
  }

  formatarCpfCnpj(cpfCnpj){
    this.globalService.formatarPessoas(cpfCnpj);
    return cpfCnpj;
  }

  consultar(){
      this.router.navigate(['agendamento/consultar', this.cpfCnpj]);
  }

  avaliar(){
    this.router.navigate(['avaliacao/consultar', this.cpfCnpj]);
  }

  contador(){
    this.avaliacaoService.findByContagem(this.cpfCnpj).subscribe(( res: any)=>{
      this.cont = res;
      if(this.cont == 0){
        this.btnAgendar = true;
      }
    });
  }

}
