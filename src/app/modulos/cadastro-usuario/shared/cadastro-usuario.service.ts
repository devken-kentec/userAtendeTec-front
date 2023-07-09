import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {

  private readonly API = `${environment.API}/atendeTec/api/contribuinte`;

  constructor(private http: HttpClient) { }

  create(contribuinte){
    return this.http.post(`${this.API}`, contribuinte).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.API}/${id}`).pipe(
      take(1)
    );
  }
}
