import multer from 'multer';
import path from 'node:path';
import crypto from 'crypto';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'tmp', 'uploads'));
	},
	filename: function (req, file, cb) {
		const extensaoArquivo = file.originalname.split('.')[1];
		const novoNomeArquivo = crypto.randomUUID();

		cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
	}
});

export const upload = multer({ storage });