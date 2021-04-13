import ProdutoPedidoRepo from '../Repositories/ProdutoPedido'

export default async (produtoPedido) => {
    const erros = [];

    const produtoPedidoFiltro = (await ProdutoPedidoRepo.buscarFiltro(`
        select * from produtopedido where idPedido = '${produtoPedido.idPedido}'
    `))[0]

    const existsProdutoAddd = produtoPedidoFiltro.find(v => v.idProduto === produtoPedido.idProduto)

    if (!produtoPedido.uuid && existsProdutoAddd) {
        erros.push({
            idProduto: 'Não é possível adicionar dois produtos iguais na venda.'
        })
    }

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
