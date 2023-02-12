import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IKnight } from '@modules/knights/dtos/KnightsDTO';
import { IKnightRepository } from '@modules/knights/repositories/IKnightRepository';

@injectable()
export class UpdateKnightByIdUseCase {
	constructor(
		@inject('KnightRepository')
		private readonly knightRepository: IKnightRepository
	){}

	public async execute(knightId: object, knight: IKnight): Promise<IKnight | void> {
		const findAndUpdateKnight = await this.knightRepository
			.updateKnightById(knightId, knight);


		if (!findAndUpdateKnight)
			throw new AppError({
				message: 'Knight not found!',
				statusCode: 404
			});

		return findAndUpdateKnight;
	}
}