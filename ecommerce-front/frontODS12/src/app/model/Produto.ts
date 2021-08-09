import { Categoria } from "./Categoria"
import { Usuario } from "./Usuario"

export class Produto {
    public idProduto: number
    public status: string
    public endereco: string
    public dataRetirada: string
    public descricao: string
    public quantidade: number
    public categoria: string
    public usuario: Usuario
}