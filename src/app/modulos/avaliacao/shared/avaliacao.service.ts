import { delay, take, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Avaliacao } from './avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private readonly API = `${environment.API}/atendeTec/api/fila`;

  constructor(private http: HttpClient) { }

  findByIdentificador(identificador){
    return this.http.get(`${this.API}/verifica/${identificador}`).pipe(
      take(1)
    );
  }


  listAgendamentoCpfCnpjAtivado(cpfCnpj){
    return this.http.get<Avaliacao[]>(`${this.API}/consultar/avaliar/${cpfCnpj}`).pipe(
      take(1)
    );
  }

  findByFila(id){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

  findByContagem(cpfCnpj){
    return this.http.get(`${this.API}/contarAvaliacao/${cpfCnpj}`).pipe(
      take(1)
    );
  }

  avaliar(idFila, idAgenda, nota){

    const httpParams = new HttpParams()
    .set("idFila", idFila)
    .set("idAgenda", idAgenda)
    .set("nota", nota);

    const url = this.API + "/mobile/avaliando?" + httpParams;

    return this.http.get(url).pipe(
      delay(1000),
      take(1)
    );
  }
}
