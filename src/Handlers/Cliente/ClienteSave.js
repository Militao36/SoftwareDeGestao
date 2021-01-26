import ClienteRepo from '../../Repositories/Clientes';
import ValidatorCliente from '../../Validators/Cliente';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';

class HandleCliente {
    Handler = async (cliente, idEmpresa) => {
        const Cliente = {
            ...cliente, idEmpresa,
            createAt: DateTime.local().toSQLDate(),
            uuid: v4()
        };

        const validacoes = ValidatorCliente(Cliente);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await ClienteRepo.save(Cliente);
        return Cliente.uuid
    }
}

export default new HandleCliente();
