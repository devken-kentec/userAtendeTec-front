import { GlobalService } from './../../shared/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroUsuarioService } from '../shared/cadastro-usuario.service';

@Component({
  selector: 'app-cadastro-usuario-form',
  templateUrl: './cadastro-usuario-form.component.html',
  styleUrls: ['./cadastro-usuario-form.component.css']
})
export class CadastroUsuarioFormComponent implements OnInit {

  cadUserForm: FormGroup;
  password: string;
  confirm_password: string;

  nome: string = "";
  cpfCnpj: string = "";
  email: string = "";
  fone: string = "";
  senha: string = "";

  constructor(private fb: FormBuilder,
              private usuarioService: CadastroUsuarioService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.cadUserForm = this.fb.group({
        nome: ['',[Validators.required]],
        cpfCnpj:['',[Validators.required]],
        email: ['',[Validators.required, Validators.email]],
        fone: ['',[Validators.required]],
        senha: ['',[Validators.required ,Validators.minLength(6)]],
        confirmarSenha:['',[Validators.required, Validators.minLength(6)]]
    });
  }

  validarSenha(){
      this.password = this.cadUserForm.get('senha').value;
      this.confirm_password = this.cadUserForm.get('confirmarSenha').value;

        if(this.password != this.confirm_password) {
          this.cadUserForm.get('senha').setValue("");
          this.cadUserForm.get('confirmarSenha').setValue("")
        }
  }

  confirmarDados(){
    this.validarSenha();
    this.nome = this.cadUserForm.get('nome').value;
    this.cpfCnpj = this.cadUserForm.get('cpfCnpj').value;
    this.email = this.cadUserForm.get('email').value;
    this.fone = this.cadUserForm.get('fone').value;
    this.senha = this.cadUserForm.get('senha').value;
  }

  formatarPessoas(pfj: string){
    let res: string;
      res = this.globalService.formatarPessoas(pfj);
    return res;
  }

  onSubmit(){
    if(this.cadUserForm.valid){
        this.usuarioService.create(this.cadUserForm.value).subscribe(
          success => { this.globalService.saveShow("Salvo com Sucesso!", "Usuário") }
        );
     }
     this.cadUserForm.reset();
  }

  limpar(){
    this.cadUserForm.reset();
  }
}
