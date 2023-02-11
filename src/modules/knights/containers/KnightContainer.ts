import { container } from  'tsyringe';
import { IKnightRepository } from '@modules/knights/repositories/IKnightRepository';
import { KnightRepository } from '@modules/knights/repositories/implementations/KnightRepository';
import { KnightCreationUseCase } from '@modules/knights/useCases/createKnight/KnightCreationUseCase';
import { FindKnightByIdUseCase } from '@modules/knights/useCases/findKnightById/FindKnightByIdUseCase';
import { KnightCreationController } from '@modules/knights/useCases/createKnight/KnightCreationController';
import { FindKnightByIdController } from '@modules/knights/useCases/findKnightById/FindKnightByIdController';
import { FindKnightByFilterUseCase } from '@modules/knights/useCases/findKnightByFilter/FindKnightByFilterUseCase';
import { FindKnightByFilterController } from '@modules/knights/useCases/findKnightByFilter/FindKnightByFilterController';

container.register<IKnightRepository>(
	'KnightRepository', 
	KnightRepository
);

container.register<KnightCreationUseCase>(
	'KnightCreationUseCase', 
	KnightCreationUseCase
);

container.register<FindKnightByIdUseCase>(
	'FindKnightByIdUseCase', 
	FindKnightByIdUseCase
);

container.register<FindKnightByFilterUseCase>(
	'FindKnightByFilterUseCase',
	FindKnightByFilterUseCase
);

const knightCreationController = container.resolve(KnightCreationController);
const findKnightByIdController = container.resolve(FindKnightByIdController);
const findKnightByFilterController = container.resolve(FindKnightByFilterController);

export { 
	knightCreationController, 
	findKnightByIdController,
	findKnightByFilterController
};