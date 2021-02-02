import CaixaRepo from '../../Repositories/Caixa';
import ValidatorCaixa from '../../Validators/Caixa';
import TipoPagamento from '../../Repositories/TipoPagamento';
import { DateTime } from 'luxon';

class HandleCaixa {
    async Handler(caixa, idEmpresa) {
        const tipoPagamento = await TipoPagamento.findByIdTipoPagamento(caixa.idTipoPagamento)

        const Caixa = {
            ...caixa, idEmpresa,
            updateAt: DateTime.local().toSQLDate(),
            idTipoPagamento: tipoPagamento.idTipoPagamento || null
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
