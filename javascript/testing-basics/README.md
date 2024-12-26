# testing-basics

<!-- install jest for typescript -->
npm i -D jest typescript <!-- Prerequisites -->
npm i -D ts-jest @types/jest <!-- Installing -->
npx ts-jest config:init <!-- Creating config -->
npm test or npx jest  <!-- Running tests -->

jest.config.js file must look like this:
<!-- module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
}; -->

ts.config.json file must look like this:
<!-- {
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    }
} -->
* Note: You see it right. "module": "CommonJS" NOT "module": "es6" or similar

Test runners (Jest, Mocha, Karma, Vitest, etc)
First tests
Mocking basics
Mocking continue
Red, Green, Refactor and Jest mocks
Projects for testability