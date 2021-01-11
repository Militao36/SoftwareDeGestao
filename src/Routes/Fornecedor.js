import { Router } from 'express';
import FornecedorController from '../Controllers/Forncedor.controller';

const router = Router();
const fornecedor = new FornecedorController();

router.get('/', (req, res) => {
    return res.render('fornecedor', {
        title: 'BMS Optica'
    })
})
router.post('/', fornecedor.post);
router.put('/:id', fornecedor.put);
router.delete('/:id', fornecedor.delete);
router.get('/:id', fornecedor.findById);
router.get('/Search/:coluna/:text', fornecedor.buscarFiltro);

export default router;
