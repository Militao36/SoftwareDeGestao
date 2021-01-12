import ProdutoHandlerSave from '../Handlers/Produto/ProdutoSave';
import ProdutoHandlerUpdate from '../Handlers/Produto/ProdutoUpdate';

import ProdutoRepo from '../Repositories/Produtos';

class ProdutoController {
    async post(req, res) {
        const { codBarras, nomeProduto, valor, estoque, estoqueMin, idFornecedor } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await ProdutoHandlerSave.Handler({
            codBarras, nomeProduto, valor, estoque, estoqueMin, idFornecedor
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(201).json({ id: result });
    }

    async put(req, res) {
        const { codBarras, nomeProduto, valor, estoque, estoqueMin, idFornecedor } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await ProdutoHandlerUpdate.Handler({
            codBarras, nomeProduto, valor, estoque, estoqueMin, idFornecedor, idProduto: Number(req.params.id),
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(204).json({});
    }

    async delete(req, res) {
        try {
            const idProduto = req.params.id;
            await ProdutoRepo.delete(Number(idProduto));
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Erro ao deletar produto');
        }
    }

    async findById(req, res) {
        try {
            const idProduto = req.params.id;
            const produto = await ProdutoRepo.findById(Number(idProduto));
            return res.status(200).json({ produto: produto[0] });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar produtos');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
            let sql = 'SELECT nomeProduto,valor,estoque,idProduto FROM produto ';

            if (req.params.text !== 'null') {
                sql += `WHERE ${req.params.coluna} like '%${req.params.text}%'`;
                sql += ` and idEmpresa = ${idEmpresa}`;
            } else {
                sql += `where idEmpresa = ${idEmpresa}`;
            }
            sql += ' LIMIT 10'
            const result = await ProdutoRepo.buscarFiltro(sql);
            return res.status(200).json({
                data: result[0]
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar produtos');
        }
    }
}

export default ProdutoController;
