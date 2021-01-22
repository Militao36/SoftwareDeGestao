import ProdutoPedidoRepo from '../../Repositories/ProdutoPedido';
import ValidatorProdutosPedidos from '../../Validators/ProdutoPedido';
import ProdutoRepo from '../../Repositories/Produtos';

class HandleProdutoPedido {
    Handler = async (produtoPedido, idEmpresa) => {
        const produto = await ProdutoRepo.findByIdProduto(produtoPedido.idProduto)
        
        const ProdutoPedido = {
            ...produtoPedido, idEmpresa,
            idProduto: produto.idProduto || null
        };

        const validacoes = await ValidatorProdutosPedidos(ProdutoPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }

        await ProdutoPedidoRepo.update(ProdutoPedido);
        return true;
    }
}

export default new HandleProdutoPedido();
