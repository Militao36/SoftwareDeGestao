import { Router } from 'express';
import ClienteController from '../Controllers/Cliente.controller';

const router = Router();
const cliente = new ClienteController();

router.post('/', cliente.post);
router.put('/:id', cliente.put);
router.delete('/:id', cliente.delete);
router.get('/', cliente.buscarFiltro);

export default router;
