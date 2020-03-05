import { Request, Response } from 'express';

import FuncionarioHandlerSave from '../Handlers/Funcionario/FuncionaSave';
import FuncionarioHandlerUpdate from '../Handlers/Funcionario/FuncionaUpdate';

import FuncionarioRepo from '../Repositories/Funcionario';

class ForncedorController {
    post = async (req: Request, res: Response) => {
        const { nome, cpf, rg, logradouro, numero, complemento, bairro, cidade, uf, cep,
            telefone, celular, email, observacao, salario, dataAdmissao, comissao, diaPagamento, dataDemissao } = req.body;
        const idEmpresa = 1; // pegar do token depois

        const result = await FuncionarioHandlerSave.Handler({
            nome, cpf, rg, logradouro, numero, complemento, bairro, cidade, uf, cep,
            telefone, celular, email, observacao, salario, dataAdmissao, comissao, diaPagamento, dataDemissao,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    put = async (req: Request, res: Response) => {
        const { nome, cpf, rg, logradouro, numero, complemento, bairro, cidade, uf, cep,
            telefone, celular, email, observacao, salario, dataAdmissao, comissao, diaPagamento, dataDemissao, idFuncionario } = req.body;

        const idEmpresa = 1; // pegar do token depois

        const result = await FuncionarioHandlerUpdate.Handler({
            nome, cpf, rg, logradouro, numero, complemento, bairro, cidade, uf, cep,
            telefone, celular, email, observacao, salario, dataAdmissao, comissao,
            diaPagamento, dataDemissao, idFuncionario,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(200).json({});
    }

    delete = async (req: Request, res: Response) => {
        try {
            const idFornecedor = req.params.id;
            await FuncionarioRepo.delete(Number(idFornecedor));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar fornecedor');
        }
    }

    buscarFiltro = async (req: Request, res: Response) => {
        try {
            let sql = 'SELECT * FROM fornecedor ';
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
            const result = await FuncionarioRepo.buscarFiltro(sql);
            return res.status(200).json(result[0]);
        } catch (error) {
            return res.status(400).send('Erro ao pesquisar fornecedors');
        }
    }
}

export default ForncedorController;
