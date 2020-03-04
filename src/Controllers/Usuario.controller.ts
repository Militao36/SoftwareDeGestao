import { Request, Response } from 'express';

import UsuarioHandlerSave from '../Handlers/UsuarioSave';
import UsuarioHandlerUpdate from '../Handlers/UsuarioUpdate';

import UsuarioRepo from '../Repositories/Usuarios';

class UsuarioController {
    post = async (req: Request, res: Response) => {
        const { email, senha } = req.body;
        const idEmpresa = 1; // pegar do token depois

        const result = await UsuarioHandlerSave.Handler({ email, senha }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(203).json({ id: result });
    }

    put = async (req: Request, res: Response) => {
        const { email, senha } = req.body;
        const idEmpresa = 1; // pegar do token depois

        const result = await UsuarioHandlerUpdate.Handler({ email, senha, idUsuario: Number(req.params.id) }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.status(200).json({});
    }

    delete = async (req: Request, res: Response) => {
        try {
            const idUsuario = req.params.id;
            await UsuarioRepo.delete(Number(idUsuario));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar usuário');
        }
    }

    get = async (req: Request, res: Response) => {
        try {
            const idUsuario = req.params.id;
            await UsuarioRepo.delete(Number(idUsuario));
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).send('Erro ao deletar usuário');
        }
    }
}

export default UsuarioController;
