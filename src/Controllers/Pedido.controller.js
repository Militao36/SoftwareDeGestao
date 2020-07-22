
import PedidoHandleSave from '../Handlers/Pedido/PedidoSave';
import PedidoHandleUpdate from '../Handlers/Pedido/PedidoUpdate';

import PeidoRepo from '../Repositories/Pedido';

class PedidoController {
    post = async (req, res) => {
        const { idCliente, dataPedido, idStatusPedido, idFuncionario, valorComissao, observacao, numeroReferencia } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await PedidoHandleSave.Handler({
            idCliente, dataPedido, idStatusPedido, idFuncionario, valorComissao, observacao, numeroReferencia,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    put = async (req, res) => {
        const { idCliente, dataPedido, idStatusPedido, idFuncionario, valorComissao, observacao, numeroReferencia } = req.body;

        const idEmpresa = req.idEmpresa;

        const result = await PedidoHandleUpdate.Handler({
            idCliente, dataPedido, idStatusPedido, idFuncionario, valorComissao, observacao, numeroReferencia,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(200).json({});
    }

    delete = async (req, res) => {
        try {
            const idFornecedor = req.params.id;
            await PeidoRepo.delete(Number(idFornecedor));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar pedido');
        }
    }

    buscarFiltro = async (req, res) => {
        try {
            let sql = 'SELECT * FROM pedido ';
            const query = req.query;
            const keys = Object.keys(query);
            for (const item of keys) {
                if (item.startsWith('MENOR')) {
                    sql += `WHERE ${item.substring(5, item.length)} < '${query[item]}'`;
                } else if (item.startsWith('MAIOR')) {
                    sql += `WHERE ${item.substring(5, item.length)} > '${query[item]}'`;
                } else {
                    sql += `WHERE ${item} = '${query[item]}'`;
                }
            }
            const result = await PeidoRepo.buscarFiltro(sql);
            return res.status(200).json(result[0]);
        } catch (error) {
            return res.status(400).send('Erro ao pesquisar pedidos');
        }
    }
}

export default PedidoController;
