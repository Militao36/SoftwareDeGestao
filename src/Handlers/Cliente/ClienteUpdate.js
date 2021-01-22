import ClienteRepo from '../../Repositories/Clientes';
import ValidatorCliente from '../../Validators/Cliente';
import { DateTime } from 'luxon';

class HandleCliente {
    Handler = async (cliente, idEmpresa) => {
        const Cliente = {
            ...cliente, idEmpresa,
            updateAt: DateTime.local().toSQLDate(),
        };
        const validacoes = ValidatorCliente(Cliente);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await ClienteRepo.update(Cliente);
        return true;
    }
}

export default new HandleCliente();
