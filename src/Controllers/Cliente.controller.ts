import { Request, Response, json } from 'express';

import ClienteHandleSave from '../Handlers/Cliente/ClienteSave';

import ClienteRepo from '../Repositories/Clientes';

import Redis from '../Config/redis';

class ClienteController {
    post = async (req: Request, res: Response) => {
        const { nome, cpfCnpj, ie, subTributario, endereco, numero, complemento, bairro, cidade, estado, email, telefone } = req.body;
        const idEmpresa = 1; // pegar do token depois

        const result = await ClienteHandleSave.Handler({
            nome, cpfCnpj, ie, subTributario, endereco,
            numero, complemento, bairro, cidade, estado,
            email, telefone,
        }, idEmpresa);

        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    put = async (req: Request, res: Response) => {
        const { nome, cpfCnpj, ie, subTributario, endereco, numero, complemento, bairro, cidade, estado, email, telefone } = req.body;
        const idEmpresa = 1; // pegar do token depois

        const result = await ClienteHandleSave.Handler({
            nome, cpfCnpj, ie, subTributario, endereco,
            numero, complemento, bairro, cidade, estado,
            email, telefone,
            idCliente: Number(req.params.id),
        }, idEmpresa);

        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    delete = async (req: Request, res: Response) => {
        try {
            const idCliente = req.params.id;
            await ClienteRepo.delete(Number(idCliente));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar cliente');
        }
    }

    buscarFiltro = async (req: Request, res: Response) => {
        try {
            const idEmpresa = 1;
            let sql = 'SELECT * FROM cliente ';
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

            sql += ` and idEmpresa = ${idEmpresa}`;
            const cache = await Redis.getCache('cliente' + idEmpresa);
            if (cache) {
                return res.status(200).json({ cache: true, dados: cache });
            }
            const result = await ClienteRepo.buscarFiltro(sql);
            await Redis.setCache('cliente' + idEmpresa, JSON.stringify(result[0]));
            return res.status(200).json({ cache: false, dados: result[0] });
        } catch (error) {
            return res.status(400).send('Erro ao pesquisar clientes');
        }
    }
}

export default ClienteController;
