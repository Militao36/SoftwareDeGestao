import PedidoRepo from '../../Repositories/Pedido';
import ValidatorPedido from '../../Validators/Pedido';
import ClienteRepo from '../../Repositories/Clientes';
import FuncionarioRepo from '../../Repositories/Funcionario';
import StatusRepo from '../../Repositories/StatusPedido';
import { uuid } from '../../Utils/uuid';

class HandlePedido {
    Handler = async (pedido, idEmpresa) => {
        const [cliente, funcionario, statusPedido] = await Promise.all([
            await ClienteRepo.buscarFiltro(`select idCliente,uuid from cliente where uuid = '${pedido.idCliente}'`),
            await FuncionarioRepo.buscarFiltro(`select idFuncionario,uuid from funcionario where uuid = '${pedido.idFuncionario}'`),
            await StatusRepo.buscarFiltro(`select idStatusPedido,uuid from statusPedido where uuid = '${pedido.idStatusPedido}'`)
        ])

        const Pedido = {
            ...pedido, idEmpresa,
            uuid,
            idCliente: null,
            idFuncionario: null,
            idStatusPedido: null,
        };

        if (cliente[0].length > 0) {
            Pedido.idCliente = cliente[0][0].idCliente
        }

        if (funcionario[0].length > 0) {
            Pedido.idFuncionario = funcionario[0][0].idFuncionario
        }

        if (statusPedido[0].length > 0) {
            Pedido.idStatusPedido = statusPedido[0][0].idStatusPedido
        }


        const validacoes = ValidatorPedido(Pedido);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await PedidoRepo.save(Pedido);
        return Pedido.uuid;
    }
}

export default new HandlePedido();
