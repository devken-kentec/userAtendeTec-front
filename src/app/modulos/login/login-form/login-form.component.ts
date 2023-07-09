import { GlobalService } from './../../shared/global.service';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroUsuarioService } from '../../cadastro-usuario/shared/cadastro-usuario.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  mostrarMens: boolean = false;
  loginForm: FormGroup;
  loginAlteraForm: FormGroup;
  cpfCnpj: string = "";
  senha: string = "";
  id: number = 0;
  msgError: boolean = false;
  confereNovaSenha: boolean = false;
  confereConfirmaNovaSenha: boolean = false;
  msgErrorNovaSenha: boolean = false;
  tamanhoDaSenha: boolean = false;

  constructor(private usuarioService: CadastroUsuarioService,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      cpfCnpj: ['', []],
      senha: ['', []]
    });

    this.loginAlteraForm = this.fb.group({
      cpfCnpj: ['', []],
      senha: ['', []],
      novaSenha: ['', [Validators.minLength(6)]],
      confirmarNovaSenha: ['', [Validators.minLength(6)]]
    });
  }

  fechar(){
    this.msgError = false;
  }

  logar(){

    let cpfCnpj = this.loginForm.get('cpfCnpj').value;
    let senha = this.loginForm.get('senha').value;

    this.authService.logar(cpfCnpj, senha).subscribe((res: any)=>{
        this.id = res.id;
        this.cpfCnpj = res.cpfCnpj;
        this.senha = res.senha;

        if(this.cpfCnpj === cpfCnpj &&  this.senha === senha){
          this.authService.setLoggedIn(true);
          this.router.navigate(['agendamento/user', this.id]);
        }
    }, (error: any) => { this.msgError = true }
    );
    this.loginForm.reset();
  }


  validarNovaSenha(){
      let novaSenha = this.loginAlteraForm.get('novaSenha').value;
      if(novaSenha != "" ){
          this.confereNovaSenha = true;
      } else {
        this.confereNovaSenha = false;
      }
  }

  validarConfereNovaSenha(){

  let novaSenha = this.loginAlteraForm.get('novaSenha').value;
  let confirmarNovaSenha = this.loginAlteraForm.get('confirmarNovaSenha').value

  if(novaSenha === confirmarNovaSenha){
    this.confereConfirmaNovaSenha = true;
  }

  if (confirmarNovaSenha === ""){
    this.confereConfirmaNovaSenha = false;
  }
}

  validarDiferenca(){

  let novaSenha = this.loginAlteraForm.get('novaSenha').value;
  let confirmarNovaSenha = this.loginAlteraForm.get('confirmarNovaSenha').value

  if(novaSenha == "" || novaSenha != confirmarNovaSenha){
    this.confereConfirmaNovaSenha = false;
  }
}

  alterarSenha(){
    if(this.loginAlteraForm.valid){

      let cpfCnpj = this.loginAlteraForm.get('cpfCnpj').value;
      let senha = this.loginAlteraForm.get('senha').value;
      let novaSenha = this.loginAlteraForm.get('novaSenha').value;
      let confirmarNovaSenha = this.loginAlteraForm.get('confirmarNovaSenha').value

      this.authService.alterarSenha(cpfCnpj, senha, novaSenha, confirmarNovaSenha).subscribe(
        (success: any )=> { this.globalService.saveShow("Alterada com Sucesso!", "Senha"),
                            this.confereNovaSenha = false,
                            this.confereConfirmaNovaSenha = false
                          },
                          (error: any) => { this.msgErrorNovaSenha = true }
      );
    } else {
      this.tamanhoDaSenha = true;
    }

    this.loginAlteraForm.reset();
  }
}
