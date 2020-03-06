export default interface IPedido {
    idPedido?: number;
    idEmpresa?: number;
    idCliente: number;
    dataPedido: string;
    idStatusPedido?: number;
    idFuncionario?: number;
    valorComissao?: number;
    observacao?: string;
    numeroReferencia?: string;
}
