import { add } from '../src/index';

test('add function adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
