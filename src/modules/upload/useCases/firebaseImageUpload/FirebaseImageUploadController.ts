import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { handleError } from '@shared/utils/handleError';
import { FirebaseImageUploadUseCase } from './FirebaseImageUploadUseCase';

@injectable()
export class FirebaseImageUplaodController {
	constructor(
        @inject('FirebaseImageUploadUseCase')
        private readonly firebaseImageUploadUseCase: FirebaseImageUploadUseCase
	){}

	public async handle(request: Request, response: Response){
		const image = request.file;

		try {

			const uploadImage = await this.firebaseImageUploadUseCase.execute(image);

			return response.status(200).send({
				message: 'Image uploaded sucessfully!',
				data: {
					url: uploadImage
				}
			});
            
		}catch(error){
			handleError(error, response);
		}
	}
}