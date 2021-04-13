import ProdutoPedidoRepo from '../../Repositories/ProdutoPedido';
import ValidatorProdutosPedidos from '../../Validators/ProdutoPedido';
import ProdutoRepo from '../../Repositories/Produtos';
import PedidoRepo from '../../Repositories/Pedido';
import Estoque from '../../Estoque/Estoque';
import { DateTime } from 'luxon'

class HandleProdutoPedido {
    Handler = async (produtoPedido, idEmpresa) => {
        const produto = await ProdutoRepo.findByIdProduto(produtoPedido?.idProduto)
        const pedido = await PedidoRepo.findByIdPedido(produtoPedido.idPedido)

        const produtoPedidoAnterior = await ProdutoPedidoRepo.findById(produtoPedido.uuid)

        const ProdutoPedido = {
            ...produtoPedido, idEmpresa,
            idProduto: produto?.idProduto ?? null,
            idPedido: pedido?.idPedido ?? null,
            updateAt: DateTime.local().toSQLDate()
        };

        const validacoes = await ValidatorProdutosPedidos(ProdutoPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }

        await ProdutoPedidoRepo.update(ProdutoPedido);

        // Desfazer a saida do produto pois atualizei o produto no pedido
        await Estoque.desfazerSaida(produtoPedidoAnterior.quantidade, produtoPedido.idProduto, produtoPedido.idPedido)

        // // Da a saida do produto novamente, após desfazer a saida antiga
        await Estoque.saida(produtoPedido.quantidade, produtoPedido.idProduto, produtoPedido.idPedido)

        return true;
    }
}

export default new HandleProdutoPedido();
