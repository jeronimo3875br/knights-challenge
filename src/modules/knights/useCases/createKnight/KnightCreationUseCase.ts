import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IKnightRepository } from '@modules/knights/repositories/IKnightRepository';
import { IKnight, IKnightAttributes, IKnightWeapon } from '@modules/knights/dtos/KnightsDTO';

@injectable()
export class KnightCreationUseCase {
	constructor(
		@inject('KnightRepository')
		private readonly knightRepository: IKnightRepository
	){}

	private async extractIdFromWeapons(knightWeapons: IKnightWeapon[]): Promise<object[]> {
		return new Promise((resolve) => {
			const weaponsId: object[] = [];
			const weaponsLength = knightWeapons.length;

			knightWeapons.forEach(({ _id }, index) => {
				weaponsId.push(_id);

				if (index >= (weaponsLength - 1))
					resolve(weaponsId);
			});
		});
	}

	public async execute(knight: IKnight): Promise<IKnight> {
		const findKnight = await this.knightRepository.findKnightByNickname(knight.nickname);

		if (findKnight)
			throw new AppError({
				message: `There is already a ${findKnight.isHero ? 'hero' : 'warrior' } registered with that nickname!`,
				statusCode: 400
			});

		const createKnightWeapon = await this.knightRepository
			.createKnightWeapon(knight.weapons as IKnightWeapon[]);

		const createKnightAttributes = await this.knightRepository
			.createKnightAttribute(knight.attributes as IKnightAttributes);

		const weaponsId = await this.extractIdFromWeapons(createKnightWeapon);

		knight.weapons = weaponsId;
		knight.attributes = createKnightAttributes._id;

		return await this.knightRepository.createKnight(knight);
	}
}