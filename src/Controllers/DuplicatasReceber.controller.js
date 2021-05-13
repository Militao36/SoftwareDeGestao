import HandleSave from '../Handlers/DuplicatasReceber/DuplicatasReceberSave'
import HandleUpdate from '../Handlers/DuplicatasReceber/DuplicatasReceberUpdate'
import DuplicataRepo from '../Repositories/DuplicatasReceber'

class DuplicatasReceber {
    async post(req, res) {
        try {
            const { idCliente, idTipoPagamento, idFuncionario,
                comissao, dataEmissao, dataVencimento, dataPagamento,
                valorTotal, valorPago, valorDevedor, observacao } = req.body

            const result = await HandleSave.Handler({
                idCliente, idTipoPagamento, idFuncionario,
                comissao, dataEmissao, dataVencimento, dataPagamento,
                valorTotal, valorPago, valorDevedor, observacao
            }, req.idEmpresa);

            if (Array.isArray(result)) {
                return res.status(422).json({ validacoes: result });
            }
            return res.status(201).json({ id: result });
        } catch (error) {
            console.log(error)
            return res.status(500).send('Ocorreu um erro ao salvar duplicata.');
        }
    }

    async put(req, res) {
        try {
            const { idCliente, idTipoPagamento, idFuncionario,
                comissao, dataEmissao, dataVencimento, dataPagamento,
                valorTotal, valorPago, valorDevedor, observacao } = req.body

            const result = await HandleUpdate.Handler({
                idCliente, idTipoPagamento, idFuncionario,
                comissao, dataEmissao,
                dataVencimento, dataPagamento,
                valorTotal, valorPago, valorDevedor, observacao,
                uuid: req.params.id,
            }, req.idEmpresa);

            if (Array.isArray(result)) {
                return res.status(422).json({ validacoes: result });
            }
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Ocorreu um erro ao atualizar duplicata.');
        }
    }

    async delete(req, res) {
        try {
            const uuid = req.params.id;
            await DuplicataRepo.delete(uuid);
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Ocorreu um erro ao deletar duplicata.');
        }
    }

    async findById(req, res) {
        try {
            const uuid = req.params.id;
            const duplicata = await DuplicataRepo.findById(uuid);
            return res.status(200).json({ duplicata });
        } catch (error) {
            return res.status(500).send('Ocorreu um erro ao pesquisa duplicata.');
        }
    }

    async buscarFiltro(req, res) {
        try {

        } catch (error) {
            return res.status(500).send('MESSAGE');
        }
    }
}

export default DuplicatasReceber;
