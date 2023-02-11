import path from 'node:path';
import { AppError } from '@shared/errors/AppError';
import { removeFile } from '@shared/utils/fileHandler';
import { firebaseBucket } from '@shared/services/firebase';
import { googleCloud } from '@shared/config/googleCloudConfig';

export class FirebaseImageUploadUseCase {
	public async execute(image: Express.Multer.File, isTestMode: boolean): Promise<string> {
		const imagePath = path.join(
			__dirname, '..', '..', '..', '..', 'shared', 'tmp', 'uploads', image.filename
		);

		const uplaodKnightImage = await firebaseBucket
			.upload(imagePath);

		await uplaodKnightImage[0]
			.makePublic();

		const removeQRCodeImageFromLocal = await removeFile(isTestMode ? `${imagePath}/testerror` : imagePath);

		if (!removeQRCodeImageFromLocal)
			throw new AppError({
				message: 'Failed to upload image creation has been cancelled!',
				statusCode: 500
			});

		return `https://storage.googleapis.com/${googleCloud.storage.bucket}/${image.filename}`;
	}
}