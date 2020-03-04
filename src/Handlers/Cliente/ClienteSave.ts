import ICliente from '../../Interfaces/ICliente';
import ClienteRepo from '../../Repositories/Clientes';
import ValidatorCliente from '../../Validators/Cliente';
import { DateTime } from 'luxon';

class HandleCliente {
    Handler = async (cliente: ICliente, idEmpresa: number) => {
        const Cliente = { ...cliente, idEmpresa, ativo: false, createAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorCliente(Cliente);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await ClienteRepo.save(Cliente);
        return Number(retorno[0]);
    }
}

export default new HandleCliente();
