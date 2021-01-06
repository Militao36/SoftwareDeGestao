import ProdutoHandlerSave from '../Handlers/Produto/ProdutoSave';
import ProdutoHandlerUpdate from '../Handlers/Produto/ProdutoUpdate';

import ProdutoRepo from '../Repositories/Produtos';

class ProdutoController {
    async post(req, res) {
        const { codBarras, nomeProduto, valor, estoque, estoqueMin, idFornecedor } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await ProdutoHandlerSave.Handler({ codBarras, nomeProduto, valor, estoque, estoqueMin, idFornecedor }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    async put(req, res) {
        const { codBarras, nomeProduto, valor, estoque, estoqueMin, idFornecedor } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await ProdutoHandlerUpdate.Handler({
            codBarras, nomeProduto, valor, estoque, estoqueMin, idFornecedor, idProduto: Number(req.params.id),
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(200).json({});
    }

    async delete(req, res) {
        try {
            const idProduto = req.params.id;
            await ProdutoRepo.delete(Number(idProduto));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar produto');
        }
    }

    async buscarFiltro(req, res) {
        try {
            let sql = 'SELECT * FROM produto ';
            const query = req.query;
            const keys = Object.keys(query);
            for (const item of keys) {
                if (item.startsWith('MENOR')) {
                    sql += `WHERE ${item.substring(5, item.length)} < '${query[item]}'`;
                } else if (item.startsWith('MAIOR')) {
                    sql += `WHERE ${item.substring(5, item.length)} > '${query[item]}'`;
                } else {
                    sql += `WHERE ${item} = '${query[item]}'`;
                }
            }
            const result = await ProdutoRepo.buscarFiltro(sql);
            return res.status(200).json(result[0]);
        } catch (error) {
            return res.status(400).send('Erro ao pesquisar produtos');
        }
    }
}

export default ProdutoController;
