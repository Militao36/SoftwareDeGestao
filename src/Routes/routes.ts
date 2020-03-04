import { Router } from 'express';
import UsuarioRoutes from './Usuario';

const router = Router();

router.use('/Usuario', UsuarioRoutes);

router.get('/version', (req, res) => res.json({ versao: '1.0.0' }));

export default router;
