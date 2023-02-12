import { Types } from 'mongoose';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { handleError } from '@shared/utils/handleError';
import { UpdateKnightByIdUseCase } from './UpdateKnightByIdUseCase';
import { IKnight } from '@modules/knights/dtos/KnightsDTO';

@injectable()
export class UpdateKnightByIdController {
	constructor(
		@inject('UpdateKnightByIdUseCase')
		private readonly updateKnightByIdUseCase: UpdateKnightByIdUseCase
	){}

	public async handle(request: Request, response: Response): Promise<Response> {
		const knightId: string = request.params.id;
		const knight: IKnight = request.body;

		try {
			const knightObjId = new Types.ObjectId(knightId);

			const findKnight = await this.updateKnightByIdUseCase
				.execute(knightObjId, knight);

			return response.status(200).send({
				message: 'Knight updated successfully!',
				data: {
					knight: findKnight
				}
			});

		}catch(error){
			handleError(error, response);
		}
	}
}