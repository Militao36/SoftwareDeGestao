import CaixaRepo from '../../Repositories/Caixa';
import ValidatorCaixa from '../../Validators/Caixa';
import TipoPagamento from '../../Repositories/TipoPagamento';
import { v4 } from 'uuid';
import { DateTime } from 'luxon';

class HandleCaixa {
    async Handler(caixa, idEmpresa) {
        const tipoPagamento = await TipoPagamento.findByIdTipoPagamento(caixa.idTipoPagamento)
        
        const Caixa = {
            ...caixa, idEmpresa,
            uuid: v4(),
            createAt: DateTime.local().toSQLDate(),
            idTipoPagamento: tipoPagamento.idTipoPagamento || null
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
