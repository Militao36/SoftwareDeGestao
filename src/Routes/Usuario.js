import { Router } from 'express';
import UsuarioController from '../Controllers/Usuario.controller';

const router = Router();
const usuario = new UsuarioController();

router.post('/', usuario.post);
router.put('/:id', usuario.put);
router.delete('/:id', usuario.delete);
router.get('/', usuario.buscarFiltro);

export default router;
