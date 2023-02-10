import { Router } from 'express';
import { 
	knightCreationController, 
} from '@modules/knights/containers/KnightContainer';
import { upload} from '@shared/config/multerConfig';

const knightRouter = Router();

knightRouter.post(
	'/',
	upload.single('image'),
	(request, response) => 
		knightCreationController.handle(request, response)
);

export { knightRouter };