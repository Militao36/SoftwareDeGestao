import ProdutoPedidoRepo from '../../Repositories/ProdutoPedido';
import ProdutoRepo from '../../Repositories/Produtos';
import PedidoRepo from '../../Repositories/Pedido';
import ValidatorProdutosPedidos from '../../Validators/ProdutoPedido';
import Estoque from '../../Estoque/Estoque';
import { v4 } from 'uuid';
import { DateTime } from 'luxon'

class HandleProdutoPedido {
    Handler = async (produtoPedido, idEmpresa) => {
        const produto = await ProdutoRepo.findByIdProduto(produtoPedido?.idProduto)
        const pedido = await PedidoRepo.findByIdPedido(produtoPedido.idPedido)

        const ProdutoPedido = {
            ...produtoPedido, idEmpresa,
            idProduto: produto?.idProduto ?? null,
            idPedido: pedido?.idPedido ?? null,
            createAt: DateTime.local().toSQLDate(),
        };
        
        console.log(ProdutoPedido);

        const validacoes = await ValidatorProdutosPedidos(ProdutoPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }

        ProdutoPedido.uuid = v4();

        // Da a saida do produto
        await Estoque.saida(produtoPedido.quantidade, produtoPedido.idProduto, produtoPedido.idPedido)

        await ProdutoPedidoRepo.save(ProdutoPedido);

        return ProdutoPedido.uuid;
    }
}

export default new HandleProdutoPedido();
