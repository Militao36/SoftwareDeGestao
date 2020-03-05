import { Router } from 'express';
import FuncionarioController from '../Controllers/Funcionario.controller';

const router = Router();
const funcionario = new FuncionarioController();

router.post('/', funcionario.post);
router.put('/:id', funcionario.put);
router.delete('/:id', funcionario.delete);
router.get('/', funcionario.buscarFiltro);

export default router;
