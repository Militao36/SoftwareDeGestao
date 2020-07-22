import PedidoRepo from '../../Repositories/Pedido';
import ValidatorPedido from '../../Validators/Pedido';

class HandlePedido {
    Handler = async (pedido, idEmpresa) => {
        const Pedido = { ...pedido, idEmpresa };

        const validacoes = ValidatorPedido(Pedido);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await PedidoRepo.update(Pedido);
        return true;
    }
}

export default new HandlePedido();
