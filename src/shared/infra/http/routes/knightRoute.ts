import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { knightSchema } from '@modules/knights/schemas/knightSchema';
import { knightCreationController } from '@modules/knights/containers/KnightContainer';

const knightRouter = Router();

knightRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: knightSchema
	}),
	(request, response) => 
		knightCreationController.handle(request, response)
);

export { knightRouter };