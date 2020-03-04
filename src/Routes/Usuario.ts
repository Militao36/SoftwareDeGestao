import { Router } from 'express';
import UsuarioController from '../Controllers/Usuario.controller';

const router = Router();
const usuario = new UsuarioController();

router.post('/', usuario.post);

export default router;
