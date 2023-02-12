import { 
	IKnight, 
	IKnightWeapon,
	IKnightAttributes
} from '../dtos/KnightsDTO';

export interface IKnightRepository {
    findAllKnights(): Promise<IKnight[] | []>;
    findKnightsHeroes(): Promise<IKnight[] | []>;
    findKnightsWarriors(): Promise<IKnight[] | []>;
    createKnight(knight: IKnight): Promise<IKnight>;
    findKnightById(knightId: object): Promise<IKnight | void>;
    findKnightByNickname(nickname: string): Promise<IKnight | void>;
    createKnightWeapon(weapons: IKnightWeapon[]): Promise<IKnightWeapon[]>;
    createKnightAttribute(attributes: IKnightAttributes): Promise<IKnightAttributes>;
}