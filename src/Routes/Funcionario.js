import { Router } from 'express';
import FuncionarioController from '../Controllers/Funcionario.controller';

const router = Router();
const funcionario = new FuncionarioController();

router.get('/', (req, res) => {
    return res.render('funcionario', {
        title: 'BMS Optica'
    })
})
router.post('/', funcionario.post);
router.put('/:id', funcionario.put);
router.delete('/:id', funcionario.delete);
router.get('/:id', funcionario.findById);
router.get('/Search/:coluna/:text', funcionario.buscarFiltro);

export default router;
