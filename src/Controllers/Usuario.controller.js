
import UsuarioHandlerSave from '../Handlers/Usuario/UsuarioSave';
import UsuarioHandlerUpdate from '../Handlers/Usuario/UsuarioUpdate';

import UsuarioRepo from '../Repositories/Usuarios';

class UsuarioController {
    post = async (req, res) => {
        const { email, senha } = req.body;
        const idEmpresa = req.idEmpresa; 

        const result = await UsuarioHandlerSave.Handler({ email, senha, ativo: false }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    put = async (req, res) => {
        const { email, senha } = req.body;
        const idEmpresa = req.idEmpresa; 

        const result = await UsuarioHandlerUpdate.Handler({ email, senha, idUsuario: Number(req.params.id) }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(200).json({});
    }

    delete = async (req, res) => {
        try {
            const idUsuario = req.params.id;
            await UsuarioRepo.delete(Number(idUsuario));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar usuário');
        }
    }

    buscarFiltro = async (req, res) => {
        try {
            let sql = 'SELECT * FROM usuario ';
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
            const result = await UsuarioRepo.buscarFiltro(sql);
            return res.status(200).json(result[0]);
        } catch (error) {
            return res.status(400).send('Erro ao pesquisar usuários');
        }
    }
}

export default UsuarioController;
