import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaProdutos: Produto[]
  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/inicio'])
    }

    this.findAllProdutos()
    this.getAllResiduo()
  }

  findAllProdutos() {
      this.produtoService.getAllProduto().subscribe((resp: Produto []) => {
        this.listaProdutos = resp
      })
  }

  cadastrar(){
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Produto criado com sucesso!')
      this.findAllProdutos()
      this.produto = new Produto()
    })
  }

  getAllResiduo(){
    this.categoriaService.getAllResiduo().subscribe((resp: Categoria[]) =>{
      this.listaCategoria = resp
    })
  }
}
