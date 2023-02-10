import { connect } from 'mongoose';
import { databaseConfig } from '@shared/config/databaseConfig';

(async () => {
	try {
		await connect(databaseConfig.mongodb.url);
		console.log('[+] - MongoDB Connected!');

	}catch(error){
		console.log('[!] - Failed to connect to MongoDB!');
		console.log(error);
	}
})();