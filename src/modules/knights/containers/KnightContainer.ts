import { container } from  'tsyringe';
import { IKnightRepository } from '@modules/knights/repositories/IKnightRepository';
import { KnightRepository } from '@modules/knights/repositories/implementations/KnightRepository';
import { KnightCreationUseCase } from '@modules/knights/useCases/createKnight/KnightCreationUseCase';
import { KnightCreationController } from '@modules/knights/useCases/createKnight/KnightCreationController';

container.register<IKnightRepository>(
	'KnightRepository', 
	KnightRepository
);

container.register<KnightCreationUseCase>(
	'KnightCreationUseCase', 
	KnightCreationUseCase
);

const knightCreationController = container.resolve(KnightCreationController);

export { 
	knightCreationController, 
};