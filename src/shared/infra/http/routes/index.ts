import { Router } from 'express';
import { knightRouter } from './knightRoute';
import { uplaodRouter } from './uploadRoute';

const router = Router();

router.use(
	'/knights',
	knightRouter    
);

router.use(
	'/upload',
	uplaodRouter    
);

export { router };