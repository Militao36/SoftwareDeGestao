import { Router } from 'express';
import PedidoController from '../Controllers/Pedido.controller';
import ClienteRepo from '../Repositories/Clientes';
import StatusRepo from '../Repositories/StatusPedido';


const router = Router();
const Pedido = new PedidoController();

router.get('/', async (req, res) => {
    const clientes = await ClienteRepo.buscarFiltro(
        `select nome,uuid from cliente where idEmpresa = '${req.idEmpresa}'`
    )
    const status = await StatusRepo.buscarFiltro(`
        select uuid,nomeStatus from statusPedido where idEmpresa = '${req.idEmpresa}'`
    )
    const funcionario = await StatusRepo.buscarFiltro(`
        select uuid,nome from funcionario where idEmpresa = '${req.idEmpresa}'`
    )
    return res.render('pedido', {
        title: 'BMS Optica',
        cliente: clientes[0],
        status: status[0],
        funcionario: funcionario[0],
    })
});
router.post('/', Pedido.post);
router.put('/:id', Pedido.put);
router.delete('/:id', Pedido.delete);
router.get('/', Pedido.buscarFiltro);

export default router;
