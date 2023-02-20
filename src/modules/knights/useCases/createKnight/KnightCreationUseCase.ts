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

	private calculateAttack(knight: IKnight, weapon: IKnightWeapon) {
		const keyAttrMod = this.calculateAttributeMod(knight[knight.keyAttribute]);
		
		const equippedWeaponMod = weapon.mod;
		const attack = 10 + keyAttrMod + equippedWeaponMod;
		
		return attack;
	}

	private calculateAttributeMod(value) {
		if (value >= 0 && value <= 8) {
			return -2;
		} else if (value >= 9 && value <= 10) {
			return -1;
		} else if (value >= 11 && value <= 12) {
			return 0;
		} else if (value >= 13 && value <= 15) {
			return 1;
		} else if (value >= 16 && value <= 18) {
			return 2;
		} else if (value >= 19 && value <= 20) {
			return 3;
		} else {
			return 0;
		}
	}

	private calculateExperience(age: number) {
		if (age < 7) {
			return 0;
		}
		
		const exp = Math.floor((age - 7) * Math.pow(22, 1.45));
		return exp;
	}


	private calculateAgeFromMonthYear(monthYear) {
		const [month, year] = monthYear.split('/');
	
		const now = new Date();
		const birthdate = new Date(year, month - 1);
		let age = now.getFullYear() - birthdate.getFullYear();
		const monthDiff = now.getMonth() - birthdate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdate.getDate())) {
			age--;
		}
	
		return age;
	}

	public async execute(knight: IKnight): Promise<IKnight> {
		const findKnight = await this.knightRepository.findKnightByNickname(knight.nickname);

		const findEquippedWeapon = (knight.weapons as IKnightWeapon[]).find(
			({ equipped }) => equipped === true
		);

		if (!findEquippedWeapon)
			throw new AppError({
				message: 'At least one weapon must be equipped on your knight!',
				statusCode: 400
			});

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

		const calculateAttack = this.calculateAttack(knight, findEquippedWeapon);
		const calculateAge = this.calculateAgeFromMonthYear(knight.birthday);
		const calculateExperience = this.calculateExperience(calculateAge);

		knight.weapons = weaponsId;
		knight.attack = calculateAttack;
		knight.experience = calculateExperience;
		knight.attributes = createKnightAttributes._id;
	
		return await this.knightRepository.createKnight(knight);
	}
}