import { config } from 'dotenv';

config();

export const googleCloud = {
	storage: {
		token: process.env.STORAGE_TOKEN,
		bucket: process.env.STORAGE_BUCKET
	}
};