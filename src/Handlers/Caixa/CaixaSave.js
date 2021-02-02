import CaixaRepo from '../../Repositories/Caixa';
import ValidatorCaixa from '../../Validators/Caixa';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';

class HandleCaixa {
    async Handler(caixa, idEmpresa) {
        const Caixa = {
            ...caixa, idEmpresa,
            uuid: v4(),
            createAt: DateTime.local().toSQLDate()
        };

        const validacoes = ValidatorCaixa(Caixa);
        if (validacoes.length > 0) {
            return validacoes;
        }
        await CaixaRepo.save(Caixa);
        return Caixa.uuid
    }
}

export default new HandleCaixa();
