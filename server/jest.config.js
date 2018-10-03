module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/src'],
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.tsx?$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
