import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.API}/atendeTec/api/contribuinte`;

  private loggedInStatus: boolean = false;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean){
    this.loggedInStatus = value;
  }

  get isLoggedIn(){
    return this.loggedInStatus;
  }

  logar(cpfCnpj, senha){
    const httpParams = new HttpParams().set('cpfCnpj', cpfCnpj).set('senha', senha);
    const url =  this.API + "/login" + "?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }

  alterarSenha(cpfCnpj, senha, novaSenha, confirmarNovaSenha){

    const httpParams =new HttpParams()
    .set("cpfCnpj", cpfCnpj)
    .set("senha", senha)
    .set("novaSenha", novaSenha)
    .set("confirmarNovaSenha", confirmarNovaSenha);

    const url = this.API+ "/alterarSenha?" + httpParams;
    return this.http.get(url).pipe(
      take(1)
    );
  }
}
