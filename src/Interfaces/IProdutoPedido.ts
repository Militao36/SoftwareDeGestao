export default interface IProdutoPedido {
    idProdutoPedido?: number;
    idEmpresa?: number;
    quantidade: number;
    valor: number;
    desconto: number;
    observacao: string;
}
