import ICliente from '../../Interfaces/ICliente';
import ClienteRepo from '../../Repositories/Clientes';
import ValidatorCliente from '../../Validators/Cliente';
import { DateTime } from 'luxon';

class HandleCliente {
    Handler = async (cliente: ICliente, idEmpresa: number) => {
        const Cliente = { ...cliente, idEmpresa, ativo: false, updateAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorCliente(Cliente);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await ClienteRepo.update(Cliente);
        return true;
    }
}

export default new HandleCliente();
