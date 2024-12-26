// // mathUtils.test.ts
// import * as mathUtils from './mathUtils';

// jest.mock('./mathUtils', () => ({
//   add: jest.fn(),
//   subtract: jest.fn(),
// }));

// test('Mocking mathUtils module', () => {
//   (mathUtils.add as jest.Mock).mockReturnValue(10);
//   (mathUtils.subtract as jest.Mock).mockReturnValue(5);

//   expect(mathUtils.add(2, 3)).toBe(10); // Mocked return value
//   expect(mathUtils.subtract(8, 3)).toBe(5); // Mocked return value
// });

