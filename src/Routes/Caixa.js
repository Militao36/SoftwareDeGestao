import { Router } from 'express';
import CaixaController from '../Controllers/Caixa.controller';

const router = Router();
const caixa = new CaixaController();

router.get('/', (req, res) => {
    return res.render('caixa', {
        title: 'BMS Optica'
    })
})
router.post('/', caixa.post);
// router.put('/:id', caixa.put);
// router.delete('/:id', caixa.delete);
// router.get('/:id', caixa.findById);
// router.get('/Search/:coluna/:text', caixa.buscarFiltro);

export default router;
