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
            return res.status(422).json({ validacoes: result });
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
            return res.status(422).json({ validacoes: result });
        }
        return res.status(204).json({});
    }

    async delete(req, res) {
        try {
            const idFornecedor = req.params.id;
            await FornecedorRepo.delete(Number(idFornecedor));
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Erro ao deletar fornecedor');
        }
    }

    async findById(req, res) {
        try {
            const idFornecedor = req.params.id;
            const fornecedor = await FornecedorRepo.findById(Number(idFornecedor));
            return res.status(200).json({ fornecedor: fornecedor[0] });
        } catch (error) {
            console.log(error)
            return res.status(500).send('Erro ao pesquisar fornecedor');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
            let sql = 'SELECT razaoSocial,cnpjCpf,cidade,idFornecedor FROM fornecedor ';

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
