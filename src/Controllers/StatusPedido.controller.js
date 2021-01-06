import StatusPedidoHandleSave from '../Handlers/StatusPedido/StatusSave';
import StatusPedidoHandleUpdate from '../Handlers/StatusPedido/StatusUpdate';

import StatusPedidoRepo from '../Repositories/StatusPedido';

class StatusPedidoController {
    async post(req, res) {
        const { nomeStatus } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await StatusPedidoHandleSave.Handler({ nomeStatus }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    async put(req, res) {
        const { nomeStatus } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await StatusPedidoHandleUpdate.Handler({
            nomeStatus, idStatusPedido: Number(req.params.id),
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(200).json({});
    }

    async delete(req, res) {
        try {
            const idStatusPedido = req.params.id;
            await StatusPedidoRepo.delete(Number(idStatusPedido));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar status do pedido');
        }
    }

    async buscarFiltro(req, res) {
        try {
            let sql = 'SELECT * FROM statusPedido ';
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
            const result = await StatusPedidoRepo.buscarFiltro(sql);
            return res.status(200).json(result[0]);
        } catch (error) {
            return res.status(400).send('Erro ao pesquisar status do pedido');
        }
    }
}

export default StatusPedidoController;
