import { Router } from 'express';
import ProdutoController from '../Controllers/Produto.controller';
import FornecedorRepo from '../Repositories/Fornecedor';

const router = Router();
const produto = new ProdutoController();

router.get('/', async (req, res) => {
    const fornecedor = await FornecedorRepo.buscarFiltro(`
        select razaoSocial,uuid from fornecedor where idEmpresa = '${req.idEmpresa}'
    `) 
    return res.render('produto', {
        title: 'BMS Optica',
        forncedor: fornecedor[0]
    })
});
router.post('/', produto.post);
router.put('/:id', produto.put);
router.delete('/:id', produto.delete);
router.get('/:id', produto.findById);
router.get('/Search/:coluna/:text', produto.buscarFiltro);

export default router;
