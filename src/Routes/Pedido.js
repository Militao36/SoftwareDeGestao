import { Router } from 'express';
import PedidoController from '../Controllers/Pedido.controller';
import ClienteRepo from '../Repositories/Clientes';
import StatusRepo from '../Repositories/StatusPedido';
import FuncionarioRepo from '../Repositories/Funcionario'
import ProdutoRepo from '../Repositories/Produtos'


const router = Router();
const Pedido = new PedidoController();

router.get('/', async (req, res) => {
    const [clientes, status, funcionario, produto] = await Promise.all([
        ClienteRepo.buscarFiltro(`select nome,uuid from cliente where idEmpresa = '${req.idEmpresa}'`),
        StatusRepo.buscarFiltro(`select uuid,nomeStatus from statusPedido where idEmpresa = '${req.idEmpresa}'`),
        FuncionarioRepo.buscarFiltro(`select uuid,nome,comissao from funcionario where idEmpresa = '${req.idEmpresa}'`),
        ProdutoRepo.buscarFiltro(`select uuid,nomeProduto from produto where idEmpresa = '${req.idEmpresa}'`)
    ])

    return res.render('pedido', {
        title: 'BMS Optica',
        cliente: clientes[0],
        status: status[0],
        funcionario: funcionario[0],
        produto: produto[0]
    })
});
router.post('/', Pedido.post);
router.put('/:id', Pedido.put);
router.delete('/:id', Pedido.delete);
router.get('/:id', Pedido.findById);
router.get('/Search/:coluna/:text', Pedido.buscarFiltro);

export default router;
