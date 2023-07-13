import { dataset } from './testData';
import { generateMessage } from './generateMessage';

test.each(dataset)('generateMessages', ({ template, values, expected }) => {
  expect(generateMessage(template, values)).toBe(expected);
});
