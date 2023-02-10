import { Router } from 'express';
import { knightRouter } from './knightRoute';

const router = Router();

router.use(
	'/knights',
	knightRouter    
);

export { router };