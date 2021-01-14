import StatusPedidoHandleSave from '../Handlers/StatusPedido/StatusSave';
import StatusPedidoHandleUpdate from '../Handlers/StatusPedido/StatusUpdate';
import StatusPedidoRepo from '../Repositories/StatusPedido';

class StatusPedidoController {
    async post(req, res) {
        const { nomeStatus } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await StatusPedidoHandleSave.Handler({ nomeStatus }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(201).json({ id: result });
    }

    async put(req, res) {
        const { nomeStatus } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await StatusPedidoHandleUpdate.Handler({
            nomeStatus, uuid: req.params.id,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(4222).json({ validacoes: result });
        }
        return res.status(204).json({});
    }

    async delete(req, res) {
        try {
            const uuid = req.params.id;
            await StatusPedidoRepo.delete(uuid);
            return res.status(204).json({});
        } catch (error) {
            console.log
            return res.status(500).send('Erro ao deletar status do pedido');
        }
    }

    async findById(req, res) {
        try {
            const uuid = req.params.id;
            const statusPedido = await StatusPedidoRepo.findById(uuid);
            return res.status(200).json({
                statusPedido: statusPedido
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar o status do pedido.');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
            let sql = 'SELECT nomeStatus,uuid FROM statusPedido';

            if (req.params.text !== 'null') {
                sql += `WHERE ${req.params.coluna} like '%${req.params.text}%'`;
                sql += ` and idEmpresa = ${idEmpresa}`;
            } else {
                sql += `where idEmpresa = ${idEmpresa}`;
            }
            sql += ' LIMIT 10'
            const result = await StatusPedidoRepo.buscarFiltro(sql);
            return res.status(200).json({
                data: result[0]
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar o status do pedido.');
        }
    }
}

export default StatusPedidoController;
