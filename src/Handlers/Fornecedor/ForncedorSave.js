import FornecedorRepo from '../../Repositories/Fornecedor';
import ValidatorFornecedor from '../../Validators/Fornecedor';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';

class HandleFornecedor {
    Handler = async (fornecedor, idEmpresa) => {
        const Fornecedor = {
            ...fornecedor, idEmpresa,
            createAt: DateTime.local().toSQLDate(),
            uuid: v4()
        };

        const validacoes = ValidatorFornecedor(Fornecedor);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await FornecedorRepo.save(Fornecedor);
        return Fornecedor.uuid
    }
}

export default new HandleFornecedor();
