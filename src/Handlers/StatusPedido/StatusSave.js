import StatusPedidoRepo from '../../Repositories/StatusPedido';
import ValidatorStatusPedido from '../../Validators/StatusPedido';

class HandleStatusPedido {
    Handler = async (statusPeidod, idEmpresa) => {
        const StatusPedido = { ...statusPeidod, idEmpresa };

        const validacoes = ValidatorStatusPedido(StatusPedido);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const result = await StatusPedidoRepo.save(StatusPedido);
        return result[0];
    }
}

export default new HandleStatusPedido();
