import { take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly API = `${environment.API}/atendeTec/api`;

  constructor(private http: HttpClient) { }

  findByMess(){
    return this.http.get(`${this.API}/mural`).pipe(
      take(1)
    );
  }
}
