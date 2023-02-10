import { inject, injectable } from 'tsyringe';
import { IKnight, IKnightAttributes, IKnightWeapon } from '@modules/knights/dtos/KnightsDTO';
import { IKnightRepository } from '@modules/knights/repositories/IKnightRepository';

@injectable()
export class KnightCreationUseCase {
	constructor(
		@inject('KnightRepository')
		private readonly knightRepository: IKnightRepository
	){}

	public async execute(knight: IKnight): Promise<IKnight> {
		const createKnightWeapon = await this.knightRepository
			.createKnightWeapon(knight.weapons as IKnightWeapon[]);

		const createKnightAttributes = await this.knightRepository
			.createKnightAttribute(knight.attributes as IKnightAttributes);

		const extractIdFromWeapons = async (): Promise<object[]> => {
			return new Promise((resolve) => {
				const weaponsId: object[] = [];
				const weaponsLength = createKnightWeapon.length;

				createKnightWeapon.forEach(({ _id }, index) => {
					weaponsId.push(_id);

					if (index >= (weaponsLength - 1))
						resolve(weaponsId);
				});
			});
		};

		const weaponsId = await extractIdFromWeapons();

		knight.weapons = weaponsId;
		knight.attributes = createKnightAttributes._id;

		return await this.knightRepository.createKnight(knight);
	}
}