import { MyTemplate, Template } from './components/EditorWidget/EditorWidget';

export const generateMessage = (template: MyTemplate, values: Record<string, string>) => {
  let result: string[] = [];

  if (!template.children) return replacer(template.main, values);
  result.push(template.main);
  generateMessageHelper(template.children, values, result);

  const resultString = replacer(result.join(''), values);
  return resultString;
};

function generateMessageHelper(
  children: Template[],
  values: Record<string, string>,
  result: string[]
) {
  for (let child of children) {
    if (replacer(child.condition, values)) {
      result.push(child.condTrue.value);
      generateMessageHelper(child.condTrue.children, values, result);
    } else {
      result.push(child.condFalse.value);
      generateMessageHelper(child.condFalse.children, values, result);
    }
    result.push(child.additional.value);
  }
}

const replacer = (initialString: string, values: Record<string, string>) => {
  const keys = Object.keys(values);

  return keys.reduce((acc, key) => {
    return acc.replaceAll(`{${key}}`, values[key]);
  }, initialString);
};
