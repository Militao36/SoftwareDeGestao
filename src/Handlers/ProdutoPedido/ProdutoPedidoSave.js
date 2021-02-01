import ProdutoPedidoRepo from '../../Repositories/ProdutoPedido';
import ProdutoRepo from '../../Repositories/Produtos';
import ValidatorProdutosPedidos from '../../Validators/ProdutoPedido';
import Estoque from '../../Estoque/Estoque';
import { v4 } from 'uuid';
import { DateTime } from 'luxon'

class HandleProdutoPedido {
    Handler = async (produtoPedido, idEmpresa) => {
        const produto = await ProdutoRepo.findByIdProduto(produtoPedido.idProduto)

        const ProdutoPedido = {
            ...produtoPedido, idEmpresa,
            idProduto: produto.idProduto || null,
            createAt: DateTime.local().toSQLDate()
        };

        const validacoes = await ValidatorProdutosPedidos(ProdutoPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }
        
        ProdutoPedido.uuid = v4();

        await ProdutoPedidoRepo.save(ProdutoPedido);

        // Da a saida do produto
        await Estoque.saida(produtoPedido.quantidade, produtoPedido.idProduto, produtoPedido.uuidPedido)

        return ProdutoPedido.uuid;
    }
}

export default new HandleProdutoPedido();
