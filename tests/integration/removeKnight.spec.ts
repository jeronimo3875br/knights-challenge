import request from 'supertest';
import { config } from 'dotenv';
import { Types } from 'mongoose';
import app from '@shared/infra/http/app';

config();

describe('DELETE /knights/:id', () => {
	const knightId = new Types.ObjectId(process.env.KNIGHT_ID);
	const nonexistentId = '63e8761aedee38c9da8a067e';

	it('Should return status 200 if the operation to update a rider is successful and a success message', async () => {
		const response = await request(app)
			.delete(`/knights/${knightId}`)
			.expect(200);

		expect(response.body.message).toBe('Knight updated successfully!');
	});

	it('Should return status 404, if the operation to update a rider is not successful because the rider was not found using the passed id', async () => {
		const response = await request(app)
			.delete(`/knights/${nonexistentId}`)
			.expect(404);

		expect(response.body.message).toBe('Knight not found!');
	});
});