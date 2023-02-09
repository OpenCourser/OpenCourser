import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import convert from './convert';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '👋🌎🌍🌏 Hello world from video to m3u8 converter service',
  });
});

router.use('/convert', convert);

export default router;
