import request from 'supertest';
import app from '@shared/infra/http/app';

describe('GET /knights/:id', () => {
	const knightId = '63e8761aedee38c9da8a067d';
	const nonexistentId = '63e8761aedee38c9da8a067e';

	it('Should return status 200 if the search operation for a rider by id is successful', async () => {
		await request(app)
			.get(`/knights/${knightId}`)
			.expect(200);
	});

	it('Should return status 404 if a rider is not found by id', async () => {
		await request(app)
			.get(`/knights/${nonexistentId}`)
			.expect(404);
	});
});