export default interface IProduto {
    idProduto?: number;
    codBarras: string;
    nomeProduto: string;
    valor: number;
    estoque: number;
    estoqueMin: number;
    idEmpresa?: number;
    idFornecedor?: number;
    createAt?: string;
    updateAt?: string;
}
