import IPedido from '../Interfaces/IPedido';

export default (pedido: IPedido) => {
    const erros = [];

    if (!pedido.idEmpresa) {
        erros.push('Está faltando o id da empresa.');
    }

    return erros;
};
