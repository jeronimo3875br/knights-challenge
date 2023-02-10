import fs from 'node:fs';

function removeFile(filePath: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, (error) => {
			if(error && error.code == 'ENOENT') {
				reject(false);
			} else if (error) {
				reject(false);
			}else {
				resolve(true);
			}
		});
	});
}

export { removeFile };