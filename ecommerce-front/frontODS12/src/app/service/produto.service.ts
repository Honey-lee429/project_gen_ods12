import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>('https://sucateriagenn.herokuapp.com/produto/buscar/todos', this.token)
  }

  getByIdProduto(idProduto:number): Observable<Produto>{
    return this.http.get<Produto>(`https://sucateriagenn.herokuapp.com/produto/buscar/id/${idProduto}`, this.token)
  }

  getByStatusProduto(status:string): Observable<Produto>{
    return this.http.get<Produto>(`https://sucateriagenn.herokuapp.com/produto/buscar/status/${status}`, this.token)
  }

  postProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('https://sucateriagenn.herokuapp.com/produto/cadastrar', produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('https://sucateriagenn.herokuapp.com/produto/atualizar/id', produto, this.token)
  }

  deleteProduto(idProduto:number) {
    return this.http.delete(`https://sucateriagenn.herokuapp.com/produto/deletar/id/${idProduto}`, this.token)
  }
}
