import { Router } from 'express';
import { 
	knightCreationController, 
} from '@modules/knights/containers/KnightContainer';

const knightRouter = Router();

knightRouter.post(
	'/',
	(request, response) => 
		knightCreationController.handle(request, response)
);

export { knightRouter };