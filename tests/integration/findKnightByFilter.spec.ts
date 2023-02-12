import request from 'supertest';
import app from '@shared/infra/http/app';

describe('GET /knights', () => {
	it('Should return status 200 if the operation to filter knights who are heroes is successful', async () => {
		await request(app)
			.get('/knights?filter=heroes')
			.expect(200);
	});

	it('Should return status 200 if the operation to filter knights who are warriors is successful', async () => {
		await request(app)
			.get('/knights?filter=warriors')
			.expect(200);
	});

	it('Should return all knights if a filter is not passed', async () => {
		await request(app)
			.get('/knights')
			.expect(200);
	});
});