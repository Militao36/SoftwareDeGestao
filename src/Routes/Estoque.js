import { Router } from 'express';
import EstoqueController from '../Controllers/Estoque.controller';
import ProdutoRepo from '../Repositories/Produtos'

const router = Router();
const estoque = new EstoqueController();

router.get('/', async (req, res) => {
    const produtos = await ProdutoRepo.buscarFiltro(`
        select uuid,nomeProduto from produto where idEmpresa = '${req.idEmpresa}'
    `)
    return res.render('estoque', {
        title: 'BMS Optica',
        produtos: produtos[0]
    })
})
router.post('/entrada', estoque.entradaProduto);
router.post('/saida', estoque.saidaProduto);

export default router;
