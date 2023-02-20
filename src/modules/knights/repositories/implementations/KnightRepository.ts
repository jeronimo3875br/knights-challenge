import { knightsModel } from '../../models/KnightsModel';
import { IKnightRepository } from '../IKnightRepository';
import { knightsWaponModel } from '../../models/KnightsWeaponsModel';
import { knightsAttributesModel } from '../../models/KnightsAttributesModel';
import { IKnight, IKnightWeapon, IKnightAttributes } from '@modules/knights/dtos/KnightsDTO';

export class KnightRepository implements IKnightRepository {
	async updateKnightById(knightId: object, knight: IKnight): Promise<IKnight> {
		return await knightsModel.findByIdAndUpdate(knightId, knight);
	}

	async findKnightsWarriors(): Promise<IKnight[] | []> {
		return await knightsModel.find({
			isHero: false
		}).populate([
			'weapons',
			'attributes'
		]);
	}

	async findAllKnights(): Promise<[] | IKnight[]> {
		return await knightsModel.find().populate([
			'weapons',
			'attributes'
		]);
	}

	async findKnightsHeroes(): Promise<IKnight[] | []> {
		return await knightsModel.find({
			isHero: true
		}).populate([
			'weapons',
			'attributes'
		]);
	}

	async findKnightByNickname(nickname: string): Promise<void | IKnight> {
		return await knightsModel.findOne({
			nickname
		}).populate([
			'weapons',
			'attributes'
		]);
	}

	async findKnightById(knightId: object): Promise<void | IKnight> {
		return await (await knightsModel.findById(knightId))?.populate([
			'weapons',
			'attributes'
		]);
	}

	async createKnight(knight: IKnight): Promise<IKnight> {
		return await (await knightsModel.create(knight)).populate([
			'weapons',
			'attributes'
		]);
	}

	async createKnightWeapon(weapons: IKnightWeapon[]): Promise<IKnightWeapon[]> {
		return await knightsWaponModel.create(weapons);
	}

	async createKnightAttribute(attributes: IKnightAttributes): Promise<IKnightAttributes> {
		return await knightsAttributesModel.create(attributes);
	}
}