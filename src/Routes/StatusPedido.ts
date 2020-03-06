import { Router } from 'express';
import StatusPedidoController from '../Controllers/StatusPedido.controller';

const router = Router();
const StatusPedido = new StatusPedidoController();

router.post('/', StatusPedido.post);
router.put('/:id', StatusPedido.put);
router.delete('/:id', StatusPedido.delete);
router.get('/', StatusPedido.buscarFiltro);

export default router;
