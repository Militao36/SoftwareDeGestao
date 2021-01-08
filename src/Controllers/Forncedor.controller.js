import ForncedorHandlerSave from '../Handlers/Forncedor/ForncedorSave.js';
import ForncedorHandlerUpdate from '../Handlers/Forncedor/ForncedorUpdate';
import FornecedorRepo from '../Repositories/Fornecedor';

class ForncedorController {
    async post(req, res) {
        const { razaoSocial, nomeFantasia, logradouro, numero, complemento, bairro, cep, cidade, uf, telefone, celular, cnpjCpf, ie, email } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await ForncedorHandlerSave.Handler({
            razaoSocial, nomeFantasia, logradouro, numero,
            complemento, bairro, cep, cidade, uf, telefone, celular, cnpjCpf, ie, email,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(201).json({ id: result });
    }

    async put(req, res) {
        const { razaoSocial, nomeFantasia, logradouro, numero, complemento, bairro, cep,
            cidade, uf, telefone, celular, cnpjCpf, ie, email } = req.body;

        const idEmpresa = req.idEmpresa;

        const result = await ForncedorHandlerUpdate.Handler({
            razaoSocial, nomeFantasia, logradouro, numero,
            complemento, bairro, cep, cidade, uf, telefone, celular,
            cnpjCpf, ie, email, idFornecedor: req.params.id,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(204).json({});
    }

    async delete(req, res) {
        try {
            const idFornecedor = req.params.id;
            await FornecedorRepo.delete(Number(idFornecedor));
            return res.status(204).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar fornecedor');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
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
            sql += ` and idEmpresa = ${idEmpresa}`;
            const result = await FornecedorRepo.buscarFiltro(sql);
            return res.status(200).json(result[0]);
        } catch (error) {
            return res.status(400).send('Erro ao pesquisar fornecedors');
        }
    }
}

export default ForncedorController;
