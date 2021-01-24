import ProdutoPedidoRepo from '../../Repositories/ProdutoPedido';
import ValidatorProdutosPedidos from '../../Validators/ProdutoPedido';
import ProdutoRepo from '../../Repositories/Produtos';
import Estoque from '../../Estoque/Estoque';

class HandleProdutoPedido {
    Handler = async (produtoPedido, idEmpresa) => {
        const produto = await ProdutoRepo.findByIdProduto(produtoPedido.idProduto)

        // registro do produto do pedido antes de atualizar
        const data = await ProdutoPedidoRepo.findById(produtoPedido.uuid)

        const ProdutoPedido = {
            ...produtoPedido, idEmpresa,
            idProduto: produto.idProduto || null
        };

        const validacoes = await ValidatorProdutosPedidos(ProdutoPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }

        await ProdutoPedidoRepo.update(ProdutoPedido);

        // Desfazer a saida do produto pois atualizei o produto no pedido
        await Estoque.desfazerSaida(data.quantidade, produtoPedido.idProduto)

        // Da a saida do produto novamente, após desfazer a saida antiga
        await Estoque.saida(produtoPedido.quantidade, produtoPedido.idProduto)

        return true;
    }
}

export default new HandleProdutoPedido();
