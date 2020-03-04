import { Request, Response } from 'express';

import UsuarioHandlerSave from '../Handlers/UsuarioSave';
import UsuarioHandlerUpdate from '../Handlers/UsuarioUpdate';

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
}

export default UsuarioController;
