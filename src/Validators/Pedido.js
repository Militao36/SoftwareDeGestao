
export default (pedido) => {
    const erros = [];


    if (!pedido.idCliente) {
        erros.push({
            idCliente: 'O campo de cliente não pode ficar em branco.'
        })
    }

    if (!pedido.idStatusPedido) {
        erros.push({
            idStatusPedido: 'O campo de status do pedido não pode ficar em branco.'
        })
    }

    if (!pedido.dataPedido) {
        erros.push({
            dataPedido: 'O campo de data do pedido não pode ficar em branco.'
        })
    }

    if (!pedido.idEmpresa) {
        erros.push({
            idEmpresa: 'Está faltando o id da empresa.'
        });
    }

    return erros;
};
