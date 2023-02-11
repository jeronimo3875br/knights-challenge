import pathsHandle from 'jest-module-name-mapper';

export default {
	bail: true,
	coverageProvider: 'v8',
	preset: 'ts-jest',
	moduleNameMapper: pathsHandle()
};
