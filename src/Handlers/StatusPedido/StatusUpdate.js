import StatusPedidoRepo from '../../Repositories/StatusPedido';
import ValidatorStatusPedido from '../../Validators/StatusPedido';
import { DateTime } from 'luxon'

class HandleStatusPedido {
    Handler = async (statusPeidod, idEmpresa) => {
        const StatusPedido = {
            ...statusPeidod, 
            idEmpresa,
            updateAt: DateTime.local().toSQLDate()
        };

        const validacoes = ValidatorStatusPedido(StatusPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await StatusPedidoRepo.update(StatusPedido);
        return true;
    }
}

export default new HandleStatusPedido();
