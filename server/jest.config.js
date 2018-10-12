module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/src'],
    testEnvironment: 'node',
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.tsx?$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
