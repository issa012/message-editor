import { MyTemplate, Template } from './components/EditorWidget/EditorWidget';

export const generateMessage = (template: MyTemplate, values: Record<string, string>) => {
  let result: string[] = [];

  result.push(template.value);
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
  const regex = /\{([^}]+)\}/g;
  let replacedString = initialString.replaceAll(regex, (match, group) => {
    // console.log(match, group);
    return values.hasOwnProperty(group) ? values[group] : match;
  });
  return replacedString;
};
