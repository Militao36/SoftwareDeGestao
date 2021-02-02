
import CaixaHandleSave from '../Handlers/Caixa/CaixaSave';
import CaixaHandleUpdate from '../Handlers/Caixa/CaixaUpdate';
import CaixaRepo from '../Repositories/Caixa';

class CaixaController {

    async post(req, res) {
        const { idTipoPagamento, tipo, valor, descricao } = req.body;

        const result = await CaixaHandleSave.Handler({
            idTipoPagamento, tipo, valor, descricao
        }, req.idEmpresa);

        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(201).json({ id: result });
    }

}

export default CaixaController;
