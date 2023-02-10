import { config } from 'dotenv';

config();

interface IDatabaseConfig {
    mongodb: {
        url: string
    }
}

export const databaseConfig: IDatabaseConfig = {
	mongodb: {
		url: process.env.MONGODB_URL
	}
};