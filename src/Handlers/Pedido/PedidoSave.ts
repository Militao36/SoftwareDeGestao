import PedidoRepo from '../../Repositories/Pedido';
import ValidatorPedido from '../../Validators/Pedido';
import IPedido from '../../Interfaces/IPedido';

class HandlePedido {
    Handler = async (pedido: IPedido, idEmpresa: number) => {
        const Pedido = { ...pedido, idEmpresa };

        const validacoes = ValidatorPedido(Pedido);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await PedidoRepo.save(Pedido);
        return Number(retorno[0]);
    }
}

export default new HandlePedido();
