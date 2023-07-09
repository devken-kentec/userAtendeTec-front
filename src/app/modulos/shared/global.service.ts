import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

constructor(private toastr: ToastrService) { }


formatarDate(data: string){
  let dataCompleta = "";

     let dia = data.substring(8,10);
     let mes = data.substring(5,7);
     let ano = data.substring(0,4);

     if(dia.length == 1){
      dia = "0" + dia;
   }

   if(mes.length == 1){
     mes = "0" + mes
   }
     dataCompleta = dia+"/"+mes+"/"+ano

   return dataCompleta;
}

formatarPessoas(pfj: string){
  let res: string;
  if(pfj.length == 11 ){
    res = this.formatarCpf(pfj);
  }

  if(pfj.length == 14 ){
    res = this.formatarCnpj(pfj);
  }
  return res;
}

formatarCpf(cpf){
  let str:string = cpf;
  let p1 = str.substring(0, 3);
  let p2 = str.substring(3, 6);
  let p3 = str.substring(6, 9);
  let p4 = str.substring(9, 11);
    cpf = p1 + "." + p2 + "." + p3 + "-" + p4;
  return cpf
 }

 formatarCnpj(cnpj){
   let str: string = cnpj;

   let p1 = str.substring(0, 2);
   let p2 = str.substring(2, 5);
   let p3 = str.substring(5, 8);
   let p4 = str.substring(8, 12);
   let p5 = str.substring(12, 14);

    cnpj = p1 + "." + p2 + "." + p3 + "/" + p4 + "-" + p5;

    return cnpj;
  }

  saveShow(mensagem: string, titulo: string){
    this.toastr.success(mensagem, titulo);
  }

  removeShow(mensagem: string, titulo: string){
    this.toastr.error(mensagem, titulo);
  }

  alertShow(mensagem: string, titulo: string){
    this.toastr.info(mensagem, titulo);
  }

}
