import { knightsModel } from '../../models/KnightsModel';
import { IKnightRepository } from '../IKnightRepository';
import { knightsWaponModel } from '../../models/KnightsWeaponsModel';
import { knightsAttributesModel } from '../../models/KnightsAttributesModel';
import { IKnight, IKnightWeapon, IKnightAttributes } from '@modules/knights/dtos/KnightsDTO';

export class KnightRepository implements IKnightRepository {
	async findKnightById(knightId: object): Promise<void | IKnight> {
		return await (await knightsModel.findById(knightId)).populate([
			'weapons',
			'attributes'
		]);
	}

	async createKnight(knight: IKnight): Promise<IKnight> {
		return await knightsModel.create(knight);
	}

	async createKnightWeapon(weapons: IKnightWeapon[]): Promise<IKnightWeapon[]> {
		return await knightsWaponModel.create(weapons);
	}

	async createKnightAttribute(attributes: IKnightAttributes): Promise<IKnightAttributes> {
		return await knightsAttributesModel.create(attributes);
	}
}