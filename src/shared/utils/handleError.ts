import { Response } from 'express';
import { AppError } from '@shared/errors/AppError';

export function handleError(error: AppError | Error, response: Response){
	if (error instanceof AppError)
		return response.status(error.error.statusCode).send({
			message: error.error.message
		});

	console.error(error);

	return response.status(500).send({
		message: 'Internal server error!'
	});
}