import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { 
	knightSchema, 
	findKnightById,
	findKnightByFilter
} from '@modules/knights/schemas/knightSchema';
import { 
	knightCreationController, 
	findKnightByIdController,
	findKnightByFilterController
} from '@modules/knights/containers/KnightContainer';

const knightRouter = Router();

knightRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: knightSchema
	}),
	(request, response) => 
		knightCreationController.handle(request, response)
);

knightRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: findKnightById
	}),
	(request, response) => 
		findKnightByIdController.handle(request, response)
);

knightRouter.get(
	'/',
	celebrate({
		[Segments.QUERY]: findKnightByFilter
	}),
	(request, response) => 
		findKnightByFilterController.handle(request, response)
);

export { knightRouter };