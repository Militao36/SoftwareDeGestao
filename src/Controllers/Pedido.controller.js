
import PedidoHandleSave from '../Handlers/Pedido/PedidoSave';
import PedidoHandleUpdate from '../Handlers/Pedido/PedidoUpdate';

import PedidoRepo from '../Repositories/Pedido';

class PedidoController {
    async post(req, res) {
        const { idCliente, dataPedido, idStatusPedido, idFuncionario, observacao } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await PedidoHandleSave.Handler({
            idCliente, dataPedido, idStatusPedido, idFuncionario, observacao,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(201).json({ id: result });
    }

    async put(req, res) {
        const { idCliente, dataPedido, idStatusPedido, idFuncionario, observacao } = req.body;

        const idEmpresa = req.idEmpresa;

        const result = await PedidoHandleUpdate.Handler({
            idCliente, dataPedido, idStatusPedido, idFuncionario,
            observacao, uuid: req.params.id
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(204).json({});
    }

    async delete(req, res) {
        try {
            const uuid = req.params.id;
            await PedidoRepo.delete(uuid);
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Erro ao deletar pedido');
        }
    }

    async findById(req, res) {
        try {
            const uuid = req.params.id;
            const pedido = await PedidoRepo.findById(uuid);
            return res.status(200).json({
                pedido: {
                    idCliente: pedido.uuidCliente,
                    idFuncionario: pedido.uuidFuncionario || '',
                    idStatusPedido: pedido.uuidStatus,
                    dataPedido: pedido.dataPedido,
                    observacao: pedido.observacao,
                    uuid: pedido.uuid
                }
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar pedido');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
            let sql = `SELECT nomeCliente,DATE_FORMAT(dataPedido, "%d/%m/%Y") as dataPedido,nomeStatus,uuid FROM lis_pedido `;

            if (req.params.text !== 'null') {
                sql += `WHERE ${req.params.coluna} like '%${req.params.text}%'`;
                sql += ` and idEmpresa = ${idEmpresa}`;
            } else {
                sql += `where idEmpresa = ${idEmpresa}`;
            }
            sql += ' LIMIT 10'
            const result = await PedidoRepo.buscarFiltro(sql);
            return res.status(200).json({
                data: result[0]
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar pedido');
        }
    }
}

export default PedidoController;
