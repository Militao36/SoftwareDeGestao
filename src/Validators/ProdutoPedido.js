
export default async (produtoPedido) => {
    const erros = [];

    if (produtoPedido.idProduto === null) {
        erros.push({
            idProduto: 'Este campo não pode ficar em branco'
        })
    }

    if (!produtoPedido.valor) {
        erros.push({
            valor: 'Este campo não pode ficar em branco.'
        })
    }

    if (!produtoPedido.idEmpresa) {
        erros.push({
            idEmpresa: 'Está faltando o id da empresa.'
        });
    }

    return erros;
};
