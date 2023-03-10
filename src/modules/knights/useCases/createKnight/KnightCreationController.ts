import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { handleError } from '@shared/utils/handleError';
import { IKnight } from '@modules/knights/dtos/KnightsDTO';
import { KnightCreationUseCase } from './KnightCreationUseCase';

@injectable()
export class KnightCreationController {
	constructor(
		@inject('KnightCreationUseCase')
		private readonly knightCreationUseCase: KnightCreationUseCase
	){}

	public async handle(request: Request, response: Response): Promise<Response> {
		const knight: IKnight = request.body;

		try {
			const createKnight = await this.knightCreationUseCase.execute(knight);

			return response.status(201).send({
				message: 'Warrior successfully registered!',
				data: {
					knight: createKnight
				}
			});

		}catch(error){
			handleError(error, response);
		}
	}
}