import app from './app';

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.clear();
	console.log(`[+] - Application is running:${port}`);
});