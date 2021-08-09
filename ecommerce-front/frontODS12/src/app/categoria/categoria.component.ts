import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  lixo: Categoria = new Categoria
  listaLixo: Categoria[]
  
  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){

    if(environment.token == ""){
      alert("Seu token expirou")
      this.router.navigate(["/inicio"])
      
    }

    this.findAllResiduo()
    
  }

  cadastrar(){
    console.log("Lixo "+JSON.stringify(this.lixo))
      this.categoriaService.postResiduo(this.lixo).subscribe((resp: Categoria) => {
        this.lixo = resp
        alert("Residuo cadastrado com sucesso.")
        this.findAllResiduo()
        this.lixo = new Categoria()
      
      })
    }

    findAllResiduo(){
      this.categoriaService.getAllResiduo().subscribe((resp: Categoria[])=>{
        this.listaLixo = resp
        console.log("Lixo "+JSON.stringify(this.listaLixo))
      })
    }
  }

