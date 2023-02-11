import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { handleError } from '@shared/utils/handleError';
import { FindKnightByFilterUseCase } from './FindKnightByFilterUseCase';

@injectable()
export class FindKnightByFilterController {
	constructor(
		@inject('FindKnightByFilterUseCase')
		private readonly findKnightByFilterUseCase: FindKnightByFilterUseCase
	){}

	public async handle(request: Request, response: Response): Promise<Response> {
		const { filter } = request.query;

		try {
			const findKnightHeroes = await this.findKnightByFilterUseCase.execute(String(filter));

			return response.status(200).send({
				data: {
					knights: findKnightHeroes
				}
			});

		}catch(error){
			handleError(error, response);
		}
	}
}