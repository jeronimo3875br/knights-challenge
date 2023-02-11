import path from 'node:path';
import request from 'supertest';
import app from '@shared/infra/http/app';

describe('POST /upload', () => {
	it('Should return status 200 if the operation to upload an image is successful and it should return a link to access the image.', async () => {
		const response = await request(app)
			.post('/upload')
			.attach('image', path.join(
				__dirname, '..', '..', 'src', 'shared', 'assets', 'images', 'image-upload-test.jpg'
			))
			.expect(200);

		expect(
			response.body.data.url !== undefined && 
			response.body.message === 'Image uploaded sucessfully!'
		).toBeTruthy();
	});

	it('Deve retornar erro 400 caso a operação de enviar a imagem não seja bem sucedida por conta que a imagem não foi passada', async () => {
		await request(app)
			.post('/upload')
			.expect(400);
	});

	it('Should return error 400 if the remove image saves transient operation is unsuccessful', async () => {
		await request(app)
			.post('/upload')
			.query({
				isTestMode: true
			})
			.attach('image', path.join(
				__dirname, '..', '..', 'src', 'shared', 'assets', 'images', 'image-upload-test.jpg'
			))
			.expect(400);
	});

	it('Should return error 400 and a message with a specific error if there was an error in setting the test parameter', async () => {
		const response = await request(app)
			.post('/upload')
			.query({
				isTestMode: 0
			})
			.attach('image', path.join(
				__dirname, '..', '..', 'src', 'shared', 'assets', 'images', 'image-upload-test.jpg'
			))
			.expect(400);

		expect(response.body.message).toBe('Incorrect test parameter!');
	});
});