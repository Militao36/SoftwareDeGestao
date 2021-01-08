
import ClienteHandleSave from '../Handlers/Cliente/ClienteSave';
import ClienteHandleUpdate from '../Handlers/Cliente/ClienteUpdate';
import ClienteRepo from '../Repositories/Clientes';

class ClienteController {
    async post(req, res) {
        const { nome, cpfCnpj, ie, subTributario, endereco, numero, complemento, bairro, cidade, uf, email, telefone } = req.body;

        const result = await ClienteHandleSave.Handler({
            nome, cpfCnpj, ie, subTributario, endereco,
            numero, complemento, bairro, cidade, uf,
            email, telefone,
        }, req.idEmpresa);

        if (Array.isArray(result)) {
            return res.status(422).json({ validacoes: result });
        }
        return res.status(201).json({ id: result });
    }

    async put(req, res) {
        const { nome, cpfCnpj, ie, subTributario, endereco, numero, complemento, bairro, cidade, uf, email, telefone } = req.body;

        const result = await ClienteHandleUpdate.Handler({
            nome, cpfCnpj, ie, subTributario, endereco,
            numero, complemento, bairro, cidade, uf,
            email, telefone,
            idCliente: Number(req.params.id),
        }, req.idEmpresa);

        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(204).json();
    }

    async delete(req, res) {
        try {
            const idCliente = req.params.id;
            await ClienteRepo.delete(Number(idCliente));
            return res.status(204).json({});
        } catch (error) {
            return res.status(500).send('Erro ao deletar cliente');
        }
    }

    async findById(req, res) {
        try {
            const idCliente = req.params.id;
            const cliente = await ClienteRepo.findById(Number(idCliente));
            return res.status(200).json({ cliente: cliente[0] });
        } catch (error) {
            return res.status(500).send('Erro ao deletar cliente');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
            let sql = 'SELECT nome,cpfCnpj,cidade,idCliente FROM cliente ';

            if (req.params.text !== 'null') {
                sql += `WHERE ${req.params.coluna} like '%${req.params.text}%'`;
                sql += ` and idEmpresa = ${idEmpresa}`;
            } else {
                sql += `where idEmpresa = ${idEmpresa}`;
            }
            sql += ' LIMIT 10'
            const result = await ClienteRepo.buscarFiltro(sql);
            return res.status(200).json({
                data: result[0]
            });
        } catch (error) {
            return res.status(500).send('Erro ao pesquisar clientes');
        }
    }
}

export default ClienteController;
