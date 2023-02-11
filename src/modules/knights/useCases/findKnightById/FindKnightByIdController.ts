import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { handleError } from '@shared/utils/handleError';
import { FindKnightByIdUseCase } from './FindKnightByIdUseCase';

@injectable()
export class FindKnightByIdController {
	constructor(
		@inject('FindKnightByIdUseCase')
		private readonly findKnightByIdUseCase: FindKnightByIdUseCase
	){}

	public async handle(request: Request, response: Response): Promise<Response> {
		const knightId: string = request.params.id;

		try {
			const findKnight = await this.findKnightByIdUseCase
				.execute(Object(knightId));

			return response.status(200).send({
				data: {
					knight: findKnight
				}
			});

		}catch(error){
			handleError(error, response);
		}
	}
}