import CaixaRepo from '../../Repositories/Caixa';
import ValidatorCaixa from '../../Validators/Caixa';
import { DateTime } from 'luxon';

class HandleCaixa {
    async Handler(caixa, idEmpresa) {
        const Caixa = {
            ...caixa, idEmpresa,
            updateAt: DateTime.local().toSQLDate()
        };

        const validacoes = ValidatorCaixa(Caixa);

        if (validacoes.length > 0) {
            return validacoes;
        }
        await CaixaRepo.update(Caixa);
        return true;
    }
}

export default new HandleCaixa();
