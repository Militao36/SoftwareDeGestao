
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
            if (Number(req.params.idEmpresa) != req.idEmpresa) {
                return res.status(401).send('Você está tentando deletar dados que não são seus.')
            }
            const idCliente = req.params.id;
            await ClienteRepo.delete(Number(idCliente));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar cliente');
        }
    }

    async buscarFiltro(req, res) {
        try {
            const idEmpresa = req.idEmpresa;
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
            const result = await ClienteRepo.buscarFiltro(sql);
            return res.status(200).json({ cache: false, dados: result[0] });
        } catch (error) {
            return res.status(400).send('Erro ao pesquisar clientes');
        }
    }
}

export default ClienteController;
