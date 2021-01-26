import StatusPedidoRepo from '../../Repositories/StatusPedido';
import ValidatorStatusPedido from '../../Validators/StatusPedido';
import { v4 } from 'uuid';

class HandleStatusPedido {
    Handler = async (statusPeidod, idEmpresa) => {
        const StatusPedido = {
            ...statusPeidod, idEmpresa,
            uuid: v4()
        };

        const validacoes = ValidatorStatusPedido(StatusPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }

        await StatusPedidoRepo.save(StatusPedido);
        return StatusPedido.uuid;
    }
}

export default new HandleStatusPedido();
