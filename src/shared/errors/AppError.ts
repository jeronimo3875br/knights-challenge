interface IError {
    message: string;
    statusCode: number;
}

export class AppError {
	constructor(
        public readonly error: IError
	){}
}