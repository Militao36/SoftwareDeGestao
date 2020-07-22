import FornecedorRepo from '../../Repositories/Fornecedor';
import ValidatorFornecedor from '../../Validators/Fornecedor';
import { DateTime } from 'luxon';

class HandleFornecedor {
    Handler = async (fornecedor, idEmpresa) => {
        const Fornecedor = { ...fornecedor, idEmpresa, createAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorFornecedor(Fornecedor);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await FornecedorRepo.save(Fornecedor);
        return Number(retorno[0]);
    }
}

export default new HandleFornecedor();
