import { Router } from 'express';
import ClienteController from '../Controllers/Cliente.controller';

const router = Router();
const cliente = new ClienteController();

router.get('/', (req, res) => {
    return res.render('cliente', {
        title: 'BMS Optica'
    })
})
router.post('/', cliente.post);
router.put('/:id', cliente.put);
router.delete('/:id', cliente.delete);
router.get('/:id', cliente.findById);
router.get('/Search/:coluna/:text', cliente.buscarFiltro);

export default router;
