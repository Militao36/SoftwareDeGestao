import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.render('home', {
    title: 'BMS Optica'
  })
});

export default router;
