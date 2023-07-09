import { HomeService } from './../shared/home.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {

  mess:[]
  titulo: string;
  mensagem: string;

  constructor(private homeService: HomeService ) { }

  ngOnInit(): void {
    this.findByMess();
  }

  findByMess(){
    this.homeService.findByMess().subscribe((dados:any)=>{
         dados.forEach(mess => {
           this.titulo = mess.titulo;
           this.mensagem = mess.mensagem;
         });
    });
  }
}
