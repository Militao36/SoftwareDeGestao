import { Router } from 'express';
import CaixaController from '../Controllers/Caixa.controller';
import TipoPagamentoRepo from '../Repositories/TipoPagamento';

const router = Router();
const caixa = new CaixaController();

router.get('/', async (req, res) => {
    const tipoPagamento = await TipoPagamentoRepo.buscarFiltro(`
        select uuid,tipo from tipopagamento where idEmpresa = ${req.idEmpresa}
    `);
    return res.render('caixa', {
        title: 'BMS Optica',
        tipoPagamento: tipoPagamento[0]
    })
})

router.post('/', caixa.post);
router.put('/:id', caixa.put);
router.delete('/:id', caixa.delete);
router.get('/:id', caixa.findById);
router.get('/Search/:coluna/:text', caixa.buscarFiltro);

export default router;
