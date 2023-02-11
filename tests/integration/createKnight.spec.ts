import request from 'supertest';
import app from '@shared/infra/http/app';
import { knightsModel } from '@modules/knights/models/KnightsModel';

describe('POST /knights', () => {
	const fakeKnight = {
		'name': 'Ragnkar Lothbroook',
		'nickname': 'ragnar123',
		'birthday': '10/06',
		'weapons': [
			{
				'name': 'Machado de Guerra',
				'mod': 10,
				'equipped': true
			}
		],
		'attributes': {
			'strength': 100,
			'dexterity': 100,
			'constitution': 100,
			'intelligence': 100,
			'wisdom': 100,
			'charisma': 100
		}
	};

	afterAll(async () => {
		await knightsModel.deleteOne({
			nickname: fakeKnight.nickname
		});
	});

	it('Should return status 201, if the operation to create a knight is successful.', async () => {
		await request(app)
			.post('/knights')
			.send(fakeKnight)
			.expect(201);
	});

	it('Should return status 400 if the operation to create a knight is not successful due to an existing nickname.', async () => {
		const response = await request(app)
			.post('/knights')
			.send(fakeKnight)
			.expect(400);

		console.log(response);

		expect(
			response.body.message === 'There is already a hero registered with that nickname!' ||
			response.body.message === 'There is already a warrior registered with that nickname!'
		).toBeTruthy();
	});
});