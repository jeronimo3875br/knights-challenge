import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
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
		const { isTestMode } = request.query;

		try {
			if (!image)
				throw new AppError({
					message: 'The image that will be sent is mandatory!',
					statusCode: 400
				});

			if (isTestMode && typeof isTestMode !== 'boolean')
				throw new AppError({
					message: 'Incorrect test parameter!',
					statusCode: 400
				});

			const uploadImage = await this.firebaseImageUploadUseCase.execute(image, Boolean(isTestMode));

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