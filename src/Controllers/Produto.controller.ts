import { Request, Response } from 'express';

import ProdutoHandlerSave from '../Handlers/Produto/ProdutoSave';
import ProdutoHandlerUpdate from '../Handlers/Produto/ProdutoUpdate';

import ProdutoRepo from '../Repositories/Produtos';

class ProdutoController {
    post = async (req: Request, res: Response) => {
        const { codBarras, nomeProduto, valor, estoque, estoqueMin } = req.body;
        const idEmpresa = 1; // pegar do token depois

        const result = await ProdutoHandlerSave.Handler({ codBarras, nomeProduto, valor, estoque, estoqueMin }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    put = async (req: Request, res: Response) => {
        const { codBarras, nomeProduto, valor, estoque, estoqueMin } = req.body;
        const idEmpresa = 1; // pegar do token depois

        const result = await ProdutoHandlerUpdate.Handler({
            codBarras, nomeProduto, valor, estoque, estoqueMin, idProduto: Number(req.params.id),
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(200).json({});
    }

    delete = async (req: Request, res: Response) => {
        try {
            const idProduto = req.params.id;
            await ProdutoRepo.delete(Number(idProduto));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar produto');
        }
    }

    buscarFiltro = async (req: Request, res: Response) => {
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
