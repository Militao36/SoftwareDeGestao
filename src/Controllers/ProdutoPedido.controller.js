
import ProdutoPedidoHandleSave from '../Handlers/ProdutoPedido/ProdutoPedidoSave';
import ProdutoPedidoHandleUpdate from '../Handlers/ProdutoPedido/ProdutoPedidoUpdate';
import ProdutoPedidoRepo from '../Repositories/ProdutoPedido';
import ProdutoRepo from '../Repositories/Produtos';
import PedidoRepo from '../Repositories/Pedido';
import Estoque from '../Estoque/Estoque';

class ProdutoPedidoController {
    async post(req, res) {
        try {
            const { idProduto, quantidade, valor, desconto, observacao, idPedido } = req.body;

            const result = await ProdutoPedidoHandleSave.Handler({
                idProduto, quantidade, valor, desconto, observacao, idPedido
            }, req.idEmpresa);

            if (Array.isArray(result)) {
                return res.status(422).json({ validacoes: result });
            }

            return res.status(201).json({ id: result });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Ocorreu um erro ao adicionar produto.')
        }
    }

    async put(req, res) {
        try {
            const { idProduto, quantidade, valor, desconto, observacao, idPedido } = req.body;

            const result = await ProdutoPedidoHandleUpdate.Handler({
                idProduto, quantidade, valor, desconto, observacao, idPedido,
                uuid: req.params.id,
            }, req.idEmpresa);

            if (Array.isArray(result)) {
                return res.json({ validacoes: result });
            }
            return res.status(204).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send('Ocorreu um erro ao atualizar o produto.')
        }
    }

    async delete(req, res) {
        try {
            const uuid = req.params.id;
            const produtoPedido = await ProdutoPedidoRepo.findById(uuid);

            if (produtoPedido) {
                return res.status(400).json('Erro ao pesquisar pedido.');
            }
            
            const [produto, pedido] = await Promise.all([
                ProdutoRepo.findByUuidForIdProduto(produtoPedido.idProduto),
                PedidoRepo.findByIdPedidoToID(produtoPedido.idPedido),
            ])

            await Promise.all([
                ProdutoPedidoRepo.delete(uuid),
                Estoque.desfazerSaida(produtoPedido.quantidade, produto.uuid, pedido.uuid)
            ])

            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Erro ao deletar cliente');
        }
    }

    async findById(req, res) {
        try {
            const uuid = req.params.id;
            const produtoPedido = await ProdutoPedidoRepo.findById(uuid);
            const produto = await ProdutoRepo.findByUuidForIdProduto(produtoPedido.idProduto)

            return res.status(200).json({
                produtoPedido: {
                    uuidproduto: produtoPedido.uuid,
                    idProduto: produto.uuid,
                    quantidade: produtoPedido.quantidade,
                    valor: produtoPedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
                    desconto: produtoPedido.desconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
                    "produto.observacao": produtoPedido.observacao,
                }
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar produtos do pedido');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;

            let sql = 'SELECT uuidProduto,nomeProduto,quantidade,valor,uuidPedido,uuid FROM lis_produto_pedido ';
            sql += `where uuidPedido = '${req.params.uuidPedido}'`
            sql += ` and idEmpresa = ${idEmpresa}`;

            const result = await ProdutoPedidoRepo.buscarFiltro(sql);

            return res.status(200).json({
                data: result[0]
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar produtos do pedido');
        }
    }
}

export default ProdutoPedidoController;
