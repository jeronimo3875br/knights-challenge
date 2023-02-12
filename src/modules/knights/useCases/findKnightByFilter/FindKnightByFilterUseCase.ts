import { inject, injectable } from 'tsyringe';
import { IKnight } from '@modules/knights/dtos/KnightsDTO';
import { IKnightRepository } from '@modules/knights/repositories/IKnightRepository';

@injectable()
export class FindKnightByFilterUseCase {
	constructor(
		@inject('KnightRepository')
		private readonly knightRepository: IKnightRepository
	){}

	public async execute(filter: string): Promise<IKnight[] | []> {
		switch(filter){
		case 'heroes':
			return await this.knightRepository.findKnightsHeroes();
		case 'warriors':
			return await this.knightRepository.findKnightsWarriors();
		default:
			return await this.knightRepository.findAllKnights();
		}
	}
}