import { Router } from 'express';
import PedidoController from '../Controllers/Pedido.controller';

const router = Router();
const Pedido = new PedidoController();

router.post('/', Pedido.post);
router.put('/:id', Pedido.put);
router.delete('/:id', Pedido.delete);
router.get('/', Pedido.buscarFiltro);

export default router;
