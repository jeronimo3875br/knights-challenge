import request from 'supertest';
import app from '@shared/infra/http/app';

describe('POST /knights', () => {
	const fakeKnight = {
		name: 'Ragnkar Lothbroook',
		nickname: 'ragnar123',
		birthday: '10/06',
		weapons: [
			{
				name: 'Machado de Guerra',
				mod: 10,
				equipped: true
			}
		],
		attributes: {
			strength: 100,
			dexterit: 100,
			constitution: 100,
			intelligence: 100,
			wisdom: 100,
			charisma: 100
		}
	};

	it('Should return status 201, if the operation to create a knight is successful', async () => {
		await request(app)
			.post('/knights')
			.send(fakeKnight)
			.expect(201);
	});

	it('Should return status 400 if the create knight operation has an error.', async () => {
		await request(app)
			.post('/knights')
			.send(fakeKnight)
			.expect(400);
	});
});