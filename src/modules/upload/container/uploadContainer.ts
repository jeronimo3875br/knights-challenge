import { container } from 'tsyringe';
import { FirebaseImageUploadUseCase } from '@modules/upload/useCases/firebaseImageUpload/FirebaseImageUploadUseCase';
import { FirebaseImageUplaodController } from '@modules/upload/useCases/firebaseImageUpload/FirebaseImageUploadController';

container.register<FirebaseImageUploadUseCase>(
	'FirebaseImageUploadUseCase',
	FirebaseImageUploadUseCase
);

const firebaseImageUplaodController = container.resolve(FirebaseImageUplaodController);

export { firebaseImageUplaodController };