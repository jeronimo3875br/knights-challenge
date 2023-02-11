import { Router } from 'express';
import { upload } from '@shared/config/multerConfig';
import { firebaseImageUplaodController } from '@modules/upload/container/uploadContainer';

const uplaodRouter = Router();

uplaodRouter.post(
	'/',
	upload.single('image'),
	(request, response) =>
		firebaseImageUplaodController.handle(request, response)
);

export { uplaodRouter };