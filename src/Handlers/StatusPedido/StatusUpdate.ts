import StatusPedidoRepo from '../../Repositories/StatusPedido';
import ValidatorStatusPedido from '../../Validators/StatusPedido';
import IStatusPedido from '../../Interfaces/StatusPedido';

class HandleStatusPedido {
    Handler = async (statusPeidod: IStatusPedido, idEmpresa: number) => {
        const StatusPedido = { ...statusPeidod, idEmpresa };

        const validacoes = ValidatorStatusPedido(StatusPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await StatusPedidoRepo.update(StatusPedido);
        return true;
    }
}

export default new HandleStatusPedido();
