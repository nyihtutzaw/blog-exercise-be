import { Router } from 'express';

import routes_v1 from './v1';

const router = Router();

router.get('/health', (req, res) => {
    res.send('Welcome. App is working well');
});

router.use('/v1', routes_v1);

export default router;
