import { DetalhamentoServico } from './detalhamento-servico';
import { Agendamento } from './agendamento';
import { Calendario } from './calendario';
import { take, tap } from 'rxjs/operators';
import { Unidade } from './unidade';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly API = `${environment.API}/atendeTec/api`;

  constructor(private http: HttpClient) { }

  loadById(id){
    return this.http.get(`${this.API}/agendamento/busca/${id}`).pipe(
      take(1)
    );
  }

  senhaById(id){
    return this.http.get(`${this.API}/agendamento/senha/${id}`).pipe(
      take(1)
    );
  }

  listUnidade(){
    return this.http.get<Unidade[]>(`${this.API}/unidade`).pipe(
      take(1)
    );
  }

  listCalendario(){
      return this.http.get<Calendario[]>(`${this.API}/calendario/diasAtivos`).pipe(
        take(1)
      );
  }

  listDetalhamentoServico(servico){
    return this.http.get<DetalhamentoServico[]>(`${this.API}/detalhamentoservico/select/${servico}`).pipe(
      take(1)
    );
  }

  agendaContribuinte(calendario, unidade){
      const httpParams = new HttpParams().set("calendario", calendario).set("unidade", unidade);
      return this.http.get<Agendamento[]>(`${this.API}/agendamento/agendar?${httpParams.toString()}`).pipe(
        take(1)
      );
  }

  enviar(agendamento){
    return this.http.patch(`${this.API}/agendamento/enviar`, agendamento).pipe(
      take(1)
    );
  }

  listAgenamento(cpfCnpj){
    return this.http.get<Agendamento[]>(`${this.API}/agendamento/mobile/consulta/${cpfCnpj}`).pipe(
      take(1),
    );
  }

  listAgendamentoCpfCnpjAtivado(cpfCnpj){
    return this.http.get<Agendamento[]>(`${this.API}/agendamento/ativado/${cpfCnpj}`).pipe(
      take(1),
    );
  }

  liberarAgendamento(id){
    return this.http.get(`${this.API}/agendamento/liberarAgendamento/${id}`).pipe(
      take(1)
    );
  }

}
