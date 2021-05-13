import { Router } from 'express';
import DuplicataReceberController from '../Controllers/DuplicatasReceber.controller';

const router = Router();
const duplicata = new DuplicataReceberController();

router.post('/', duplicata.post);
router.put('/:id', duplicata.put);
router.delete('/:id', duplicata.delete);
router.get('/:id', duplicata.findById);
router.get('/Search/:coluna/:text', duplicata.buscarFiltro);

export default router;