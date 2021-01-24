import ProdutoPedidoRepo from '../../Repositories/ProdutoPedido';
import ProdutoRepo from '../../Repositories/Produtos';
import ValidatorProdutosPedidos from '../../Validators/ProdutoPedido';
import Estoque from '../../Estoque/Estoque';

import { uuid } from '../../Utils/uuid';

class HandleProdutoPedido {
    Handler = async (produtoPedido, idEmpresa) => {
        const produto = await ProdutoRepo.findByIdProduto(produtoPedido.idProduto)
        
        const ProdutoPedido = {
            ...produtoPedido, idEmpresa,
            uuid,
            idProduto: produto.idProduto || null
        };

        const validacoes = await ValidatorProdutosPedidos(ProdutoPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }

        await ProdutoPedidoRepo.save(ProdutoPedido);

        // Da a saida do produto
        await Estoque.saida(produtoPedido.quantidade, produtoPedido.idProduto)
 
        return ProdutoPedido.uuid;
    }
}

export default new HandleProdutoPedido();
