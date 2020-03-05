import { Router } from 'express';
import FornecedorController from '../Controllers/Forncedor.controller';

const router = Router();
const fornecedor = new FornecedorController();

router.post('/', fornecedor.post);
router.put('/:id', fornecedor.put);
router.delete('/:id', fornecedor.delete);
router.get('/', fornecedor.buscarFiltro);

export default router;
