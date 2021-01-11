
import FuncionarioHandlerSave from '../Handlers/Funcionario/FuncionaSave';
import FuncionarioHandlerUpdate from '../Handlers/Funcionario/FuncionaUpdate';

import FuncionarioRepo from '../Repositories/Funcionario';

class FuncionarioController {
    async post(req, res) {
        const { nome, cpf, rg, logradouro, numero, complemento, bairro, cidade, uf, cep,
            telefone, celular, email, observacao, salario, dataAdmissao, comissao, diaPagamento, dataDemissao } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await FuncionarioHandlerSave.Handler({
            nome, cpf, rg, logradouro, numero, complemento, bairro, cidade, uf, cep,
            telefone, celular, email, observacao, salario, dataAdmissao, comissao, diaPagamento, dataDemissao,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(201).json({ id: result });
    }

    async put(req, res) {
        const { nome, cpf, rg, logradouro, numero, complemento, bairro, cidade, uf, cep,
            telefone, celular, email, observacao, salario, dataAdmissao, comissao, diaPagamento, dataDemissao } = req.body;

        const idEmpresa = req.idEmpresa;

        const result = await FuncionarioHandlerUpdate.Handler({
            nome, cpf, rg, logradouro, numero, complemento, bairro, cidade, uf, cep,
            telefone, celular, email, observacao, salario, dataAdmissao, comissao,
            diaPagamento, dataDemissao, idFuncionario: req.params.id,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(204).json({});
    }

    async delete(req, res) {
        try {
            const idFuncionario = req.params.id;
            await FuncionarioRepo.delete(Number(idFuncionario));
            return res.status(204).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar funcionario');
        }
    }

    async findById(req, res) {
        try {
            const idFuncionario = req.params.id;
            const funcionario = await FuncionarioRepo.findById(Number(idFuncionario));
            return res.status(200).json({ funcionario: funcionario[0] });
        } catch (error) {
            console.log(error)
            return res.status(500).send('Erro ao pesquisar funcionario');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
            let sql = 'SELECT nome,cpf,cidade,idFuncionario FROM funcionario ';

            if (req.params.text !== 'null') {
                sql += `WHERE ${req.params.coluna} like '%${req.params.text}%'`;
                sql += ` and idEmpresa = ${idEmpresa}`;
            } else {
                sql += `where idEmpresa = ${idEmpresa}`;
            }
            sql += ' LIMIT 10'
            const result = await FuncionarioRepo.buscarFiltro(sql);
            return res.status(200).json({
                data: result[0]
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar clientes');
        }
    }
}

export default FuncionarioController;
