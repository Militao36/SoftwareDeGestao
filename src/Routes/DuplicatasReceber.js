import { Router } from 'express';
import DuplicataReceberController from '../Controllers/DuplicatasReceber.controller';
import ClienteRepo from '../Repositories/DuplicatasReceber';
import FuncionarioRepo from '../Repositories/Funcionario';

const router = Router();
const duplicata = new DuplicataReceberController();

router.get('/', async (req, res) => {
    const [cliente, funcionario] = await Promise.all([
        ClienteRepo.buscarFiltro(`select nome,uuid from cliente where idEmpresa = '${req.idEmpresa}'`),
        FuncionarioRepo.buscarFiltro(`select uuid,nome,comissao from funcionario where idEmpresa = '${req.idEmpresa}'`),
    ])


    return res.render('duplicatasReceber', {
        cliente: cliente[0],
        funcionario: funcionario[0],
        title: 'Duplicata a Receber'
    })
})

router.post('/', duplicata.post);
router.put('/:id', duplicata.put);
router.delete('/:id', duplicata.delete);
router.get('/:id', duplicata.findById);
router.get('/Search/:coluna/:text', duplicata.buscarFiltro);

export default router;