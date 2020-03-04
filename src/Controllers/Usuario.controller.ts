import { Request, Response } from 'express';

import UsuarioHandler from '../Handlers/UsuarioSave';

class UsuarioController {
    post = async (req: Request, res: Response) => {
        const { email, idUsuario, senha } = req.body;
        const idEmpresa = 1; // pegar do token depois

        const result = await UsuarioHandler.Handler({ email, idUsuario, senha }, idEmpresa);
        if (Array.isArray(result)) {
            return res.json({ validacoes: result });
        }
        return res.json({ id: result });
    }
}

export default UsuarioController;
