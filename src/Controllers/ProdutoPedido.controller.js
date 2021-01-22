
import ProdutoPedidoHandleSave from '../Handlers/ProdutoPedido/ProdutoPedidoSave';
import ProdutoPedidoHandleUpdate from '../Handlers/ProdutoPedido/ProdutoPedidoUpdate';
import ProdutoPedidoRepo from '../Repositories/ProdutoPedido';
import ProdutoRepo from '../Repositories/Produtos';

class ProdutoPedidoController {
    async post(req, res) {
        const { idProduto, quantidade, valor, desconto, observacao, uuidPedido } = req.body;

        const result = await ProdutoPedidoHandleSave.Handler({
            idProduto, quantidade, valor, desconto, observacao, uuidPedido
        }, req.idEmpresa);

        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }

        return res.status(201).json({ id: result });
    }

    async put(req, res) {
        const { idProduto, quantidade, valor, desconto, observacao, uuidPedido } = req.body;

        const result = await ProdutoPedidoHandleUpdate.Handler({
            idProduto, quantidade, valor, desconto, observacao, uuidPedido,
            uuid: req.params.id,
        }, req.idEmpresa);

        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(204).json();
    }

    async delete(req, res) {
        try {
            const uuid = req.params.id;
            await ProdutoPedidoRepo.delete(uuid);
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

            console.log(String(produtoPedido.valor).replace('.', ',').padEnd(4, '0'))
            return res.status(200).json({
                produtoPedido: {
                    uuidproduto: produtoPedido.uuid,
                    idProduto: produto.uuid,
                    quantidade: produtoPedido.quantidade,
                    valor: String(produtoPedido.valor).split('.').length == 2 ?
                        String(produtoPedido.valor).replace('.', ',').padEnd(4, '0') : `${produtoPedido.valor},00`,
                    desconto: produtoPedido.desconto,
                    "produto.observacao": produtoPedido.observacao,
                }
            });
        } catch (error) {
            console.log(error)
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
            console.log(error)
            return res.status(500).send('Erro ao pesquisar produtos do pedido');
        }
    }
}

export default ProdutoPedidoController;
