module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    // Fix this instead of mapping invidual folders
    '^auth/(.*)$': '<rootDir>/auth/$1',
    '^account/(.*)$': '<rootDir>/account/$1',
    '^user/(.*)$': '<rootDir>/user/$1',
    '^bid-item/(.*)$': '<rootDir>/bid-item/$1',
    '^common/(.*)$': '<rootDir>/common/$1',
  },
};
