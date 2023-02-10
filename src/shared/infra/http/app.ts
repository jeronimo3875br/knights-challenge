import cors from  'cors';
import 'reflect-metadata';
import helmet from 'helmet';
import '@shared/databases/mongodb';
import { router } from './routes/index';
import express, { Application } from 'express';

class App {
	public express: Application;

	constructor(){
		this.express = express();
		this.middlewares();
		this.routes();
	}

	private middlewares(): void {
		this.express.use(cors());
		this.express.use(helmet());
		this.express.use(express.json());
		this.express.use(express.urlencoded({ 
			extended: false
		}));
	}

	private routes(): void {
		this.express.use(router);
	}
}

export default new App().express;