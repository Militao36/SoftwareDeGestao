import { Router } from 'express';
import ProdutoPedidoController from '../Controllers/ProdutoPedido.controller';

const router = Router();
const produtoPedido = new ProdutoPedidoController();

router.post('/', produtoPedido.post);
router.put('/:id', produtoPedido.put);
router.delete('/:id', produtoPedido.delete);
router.get('/:id', produtoPedido.findById);
router.get('/Search/:uuidPedido', produtoPedido.buscarFiltro);

export default router;
