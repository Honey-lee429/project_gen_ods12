import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLoginDto } from '../model/UserLoginDto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  //Atributos para Usuario
  user: Usuario = new Usuario
  cSenha: string
  tipoU: string

  //Atributos para Logar
  userLogin: UserLoginDto = new UserLoginDto



  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  //Metodos para Cadastro
  confirmarSenha(event: any){
    this.cSenha = event.target.value
 
  }

  tipoUser(event: any){
    this.tipoU = event.target.value

  }

  cadastrar(){
    this.user.tipo = this.tipoU

    if(this.user.senha != this.cSenha){
      alert("As senhas não coincidem...!")
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
        this.user = resp
        this.router.navigate(["/cadastro"])
        alert("Usuario cadastrado com sucesso! Por Favor, faça o login para utilizar todas as funcionalidades do site")
      }, erro =>{
        if(erro.status == 400){
          alert("Email ou Usuario ja existem, por favor cadastre outro.")
        }
      })
    }
  }

  //Metodos para Logar
  entrar(){
    console.log(JSON.stringify(this.userLogin))
  
    this.authService.entrar(this.userLogin).subscribe((resp: UserLoginDto) =>{
      this.userLogin = resp
      environment.token = this.userLogin.token
      environment.usuario = this.userLogin.usuario
      environment.tipo = this.user.tipo
      environment.Id = this.user.Id
      console.log(this.userLogin.token)
      
      
      alert("Login efetuado com sucesso!")
      this.router.navigate(["/inicio"])
    }, erro => {
      if(erro.status == 500){
        alert("Usuario ou senha incorretos")
      }
    })
  }
}
