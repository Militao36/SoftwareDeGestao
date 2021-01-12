import ClienteRepo from '../../Repositories/Clientes';
import ValidatorCliente from '../../Validators/Cliente';
import { DateTime } from 'luxon';

class HandleCliente {
    Handler = async (cliente, idEmpresa) => {
        const Cliente = { ...cliente, idEmpresa,  createAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorCliente(Cliente);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await ClienteRepo.save(Cliente);
        return Number(retorno[0]);
    }
}

export default new HandleCliente();
