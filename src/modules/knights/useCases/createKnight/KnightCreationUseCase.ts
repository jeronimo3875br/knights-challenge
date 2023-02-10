import path from 'node:path';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { removeFile } from '@shared/utils/fileHandler';
import { firebaseBucket } from '@shared/services/firebase';
import { googleCloud } from '@shared/config/googleCloudConfig';
import { IKnightRepository } from '@modules/knights/repositories/IKnightRepository';
import { IKnight, IKnightAttributes, IKnightWeapon } from '@modules/knights/dtos/KnightsDTO';

@injectable()
export class KnightCreationUseCase {
	constructor(
		@inject('KnightRepository')
		private readonly knightRepository: IKnightRepository
	){}

	public async execute(knight: IKnight): Promise<IKnight> {
		if (knight.image){
			const imagePath = path.join(
				__dirname, '..', '..', '..', '..', 'shared', 'tmp', 'uploads', knight.image
			);
	
			const uplaodKnightImage = await firebaseBucket
				.upload(imagePath);
	
			await uplaodKnightImage[0]
				.makePublic();
	
			const removeQRCodeImageFromLocal = await removeFile(imagePath);
	
			if (!removeQRCodeImageFromLocal)
				throw new AppError({
					message: 'Failed to upload image creation has been cancelled!',
					statusCode: 500
				});

			knight.image = `https://storage.googleapis.com/${googleCloud.storage.bucket}/${knight.image}`;
		}
		
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