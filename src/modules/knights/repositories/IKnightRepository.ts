import { 
	IKnight, 
	IKnightWeapon,
	IKnightAttributes
} from '../dtos/KnightsDTO';

export interface IKnightRepository {
    createKnight(knight: IKnight): Promise<IKnight>;
    findKnightById(knightId: object): Promise<IKnight | void>;
    findKnightByNickname(nickname: string): Promise<IKnight | void>;
    createKnightWeapon(weapons: IKnightWeapon[]): Promise<IKnightWeapon[]>;
    createKnightAttribute(attributes: IKnightAttributes): Promise<IKnightAttributes>;
}