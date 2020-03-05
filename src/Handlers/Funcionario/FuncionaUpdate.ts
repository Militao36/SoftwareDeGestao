import IFuncionario from '../../Interfaces/IFuncionario';
import FuncionarioRepo from '../../Repositories/Funcionario';
import ValidatorFuncionario from '../../Validators/Funcionario';
import { DateTime } from 'luxon';

class HandleFuncionario {
    Handler = async (funcionario: IFuncionario, idEmpresa: number) => {
        const Funcionario = { ...funcionario, idEmpresa, updateAt: DateTime.local().toSQLDate() };

        const validacoes = ValidatorFuncionario(Funcionario);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await FuncionarioRepo.update(Funcionario);
        return true;
    }
}

export default new HandleFuncionario();
