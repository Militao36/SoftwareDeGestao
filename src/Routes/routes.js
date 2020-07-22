import { Router } from 'express';
import UsuarioRoutes from './Usuario';
import ClienteRoutes from './Cliente';
import ProdutoRoutes from './Produto';
import ForncedorRoutes from './Fornecedor.js';
import FuncionarioRoutes from './Funcionario';
import Pedido from './Pedido';
import StatusPedido from './StatusPedido';
import Home from './Home';

const router = Router();

router.use('/', Home);
router.use('/Usuario', UsuarioRoutes);
router.use('/Cliente', ClienteRoutes);
router.use('/Produto', ProdutoRoutes);
router.use('/Fornecedor', ForncedorRoutes);
router.use('/Funcionario', FuncionarioRoutes);
router.use('/StatusPedido', StatusPedido);
router.use('/Pedido', Pedido);

router.get('/version', (req, res) => res.json({ versao: '1.0.0' }));

export default router;
