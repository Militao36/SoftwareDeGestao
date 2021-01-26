import FuncionarioRepo from '../../Repositories/Funcionario';
import ValidatorFuncionario from '../../Validators/Funcionario';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';

class HandleFuncionario {
    Handler = async (funcionario, idEmpresa) => {
        const Funcionario = {
            ...funcionario, idEmpresa,
            createAt: DateTime.local().toSQLDate(),
            uuid: v4()
        };

        const validacoes = ValidatorFuncionario(Funcionario);
        if (validacoes.length > 0) {
            return validacoes;
        }
        const retorno = await FuncionarioRepo.save(Funcionario);
        return Number(retorno[0]);
    }
}

export default new HandleFuncionario();
