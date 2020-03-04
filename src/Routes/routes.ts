import { Router } from 'express';
import UsuarioRoutes from './Usuario';
import ClienteRoutes from './Produto';
import ProdutoRoutes from './Cliente';

const router = Router();

router.use('/Usuario', UsuarioRoutes);
router.use('/Cliente', ClienteRoutes);
router.use('/Produto', ProdutoRoutes);

router.get('/version', (req, res) => res.json({ versao: '1.0.0' }));

export default router;
