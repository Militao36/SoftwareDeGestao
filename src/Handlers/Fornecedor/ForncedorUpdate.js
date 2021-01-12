import FornecedorRepo from '../../Repositories/Fornecedor';
import ValidatorFornecedor from '../../Validators/Fornecedor';
import { DateTime } from 'luxon';

class HandleFornecedor {
    async Handler(fornecedor, idEmpresa) {
        const Fornecedor = { ...fornecedor, idEmpresa, updateAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorFornecedor(Fornecedor);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await FornecedorRepo.update(Fornecedor);
        return true;
    }
}

export default new HandleFornecedor();
