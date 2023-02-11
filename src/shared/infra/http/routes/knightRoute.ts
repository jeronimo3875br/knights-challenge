import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { upload } from '@shared/config/multerConfig';
import { knightSchema } from '@modules/knights/schemas/knightSchema';
import { knightCreationController } from '@modules/knights/containers/KnightContainer';

const knightRouter = Router();

knightRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: knightSchema
	}),
	upload.single('image'),
	(request, response) => 
		knightCreationController.handle(request, response)
);

export { knightRouter };