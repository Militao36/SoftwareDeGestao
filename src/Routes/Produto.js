import { Router } from 'express';
import ProdutoController from '../Controllers/Produto.controller';

const router = Router();
const produto = new ProdutoController();

router.post('/', produto.post);
router.put('/:id', produto.put);
router.delete('/:id', produto.delete);
router.get('/', produto.buscarFiltro);

export default router;
