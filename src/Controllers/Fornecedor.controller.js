import FornecedorHandlerSave from '../Handlers/Fornecedor/ForncedorSave.js';
import FornecedorHandlerUpdate from '../Handlers/Fornecedor/ForncedorUpdate';
import FornecedorRepo from '../Repositories/Fornecedor';

class ForncedorController {
    async post(req, res) {
        const { razaoSocial, nomeFantasia, logradouro, numero, complemento, bairro, cep, cidade, uf, telefone, celular, cnpjCpf, ie, email } = req.body;
        const idEmpresa = req.idEmpresa;

        const result = await FornecedorHandlerSave.Handler({
            razaoSocial, nomeFantasia, logradouro, numero,
            complemento, bairro, cep, cidade, uf, telefone, celular, cnpjCpf, ie, email,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(201).json({ id: result });
    }

    async put(req, res) {
        const { razaoSocial, nomeFantasia, logradouro, numero, complemento, bairro, cep,
            cidade, uf, telefone, celular, cnpjCpf, ie, email } = req.body;

        const idEmpresa = req.idEmpresa;

        const result = await FornecedorHandlerUpdate.Handler({
            razaoSocial, nomeFantasia, logradouro, numero,
            complemento, bairro, cep, cidade, uf, telefone, celular,
            cnpjCpf, ie, email, uuid: req.params.id,
        }, idEmpresa);
        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(204).json({});
    }

    async delete(req, res) {
        try {
            const uuid = req.params.id;
            await FornecedorRepo.delete(uuid);
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Erro ao deletar fornecedor');
        }
    }

    async findById(req, res) {
        try {
            const uuid = req.params.id;
            const fornecedor = await FornecedorRepo.findById(uuid);
            return res.status(200).json({ fornecedor: fornecedor[0] });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar fornecedor');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
            let sql = 'SELECT razaoSocial,cnpjCpf,cidade,uuid FROM fornecedor ';

            if (req.params.text !== 'null') {
                sql += `WHERE ${req.params.coluna} like '%${req.params.text}%'`;
                sql += ` and idEmpresa = ${idEmpresa}`;
            } else {
                sql += `where idEmpresa = ${idEmpresa}`;
            }
            sql += ' LIMIT 10'
            const result = await FornecedorRepo.buscarFiltro(sql);
            return res.status(200).json({
                data: result[0]
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar clientes');
        }
    }
}

export default ForncedorController;
