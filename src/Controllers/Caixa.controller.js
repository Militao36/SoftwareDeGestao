
import CaixaHandleSave from '../Handlers/Caixa/CaixaSave';
import CaixaHandleUpdate from '../Handlers/Caixa/CaixaUpdate';
import CaixaRepo from '../Repositories/Caixa';

class CaixaController {
    async post(req, res) {
        try {
            const { idTipoPagamento, tipo, valor, descricao } = req.body;

            const result = await CaixaHandleSave.Handler({
                idTipoPagamento, tipo, valor, descricao
            }, req.idEmpresa);

            if (Array.isArray(result)) {
                return res.status(422).json({ validacoes: result });
            }
            return res.status(201).json({ id: result });
        } catch (error) {
            return res.status(500).send('Erro ao salvar movimentação de caixa.');
        }
    }

    async put(req, res) {
        try {
            const { idTipoPagamento, tipo, valor, descricao } = req.body;

            const result = await CaixaHandleUpdate.Handler({
                idTipoPagamento, tipo, valor, descricao,
                uuid: req.params.id,
            }, req.idEmpresa);

            if (Array.isArray(result)) {
                return res.status(422).json({ validacoes: result });
            }

            return res.status(204).json();
        } catch (error) {
            console.log(error)
            return res.status(500).send('Erro ao salvar movimentação de caixa.');
        }
    }

    async delete(req, res) {
        try {
            const uuid = req.params.id;
            await CaixaRepo.delete(uuid);
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Erro ao deletar movimentação do caixa.');
        }
    }

    async findById(req, res) {
        try {
            const uuid = req.params.id;
            const caixa = await CaixaRepo.findById(uuid);
            return res.status(200).json({ caixa: caixa });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar movimentação do caixa.');
        }
    }

    async getMov(req, res) {
        try {
            const { date } = req.body;
            const caixa = await CaixaRepo.getMovDay(date, req.idEmpresa);
            return res.status(200).json({
                caixa: caixa.map(v => {
                    delete v.idEmpresa;
                    return { ...v }
                })
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar movimentação do caixa.');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
            let sql = 'SELECT tipoPagamento,valor,tipo,idEmpresa,uuid FROM lis_caixa ';

            if (req.params.text !== 'null') {
                sql += `WHERE ${req.params.coluna} like '%${req.params.text}%'`;
                sql += ` and idEmpresa = ${idEmpresa}`;
            } else {
                sql += `where idEmpresa = ${idEmpresa}`;
            }
            sql += ' LIMIT 10'
            const result = await CaixaRepo.buscarFiltro(sql);
            return res.status(200).json({
                data: result[0]
            });
        } catch (error) {
            console.log(error)
            return res.status(500).send('Erro ao pesquisar movimentações do caixa.');
        }
    }
}

export default CaixaController;
