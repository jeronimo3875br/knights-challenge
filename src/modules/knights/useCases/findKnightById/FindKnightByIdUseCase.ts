import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IKnight } from '@modules/knights/dtos/KnightsDTO';
import { IKnightRepository } from '@modules/knights/repositories/IKnightRepository';

@injectable()
export class FindKnightByIdUseCase {
	constructor(
		@inject('KnightRepository')
		private readonly knightRepository: IKnightRepository
	){}

	public async execute(knightId: object): Promise<IKnight | void> {
		const findKnight = await this.knightRepository
			.findKnightById(knightId);

		if (!findKnight)
			throw new AppError({
				message: 'Knight not found!',
				statusCode: 404
			});

		return findKnight;
	}
}