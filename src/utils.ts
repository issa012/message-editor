//@ts-nocheck
const helper = (node, depth) => {
  let result = {};
  result.condition = node.children[0].lastChild.value.slice(1, -1);
  result.conditionTrue = node.children[1].lastChild.value;
  if (depth === 1) {
    result.conditionFalse = node.children[2].lastChild.value;
  } else {
    result.child = helper(node.children[2], depth - 1);
    result.closing = node.children[3].lastChild.value;
    result.conditionFalse = node.children[4].lastChild.value;
  }
  return result;
};

export const generateTemplate: (node: HTMLDivElement, depth: number) => string[] = (
  node,
  depth
) => {
  let template = {};
  template.intro = node.children[0].value;
  if (depth === 0) {
    return template;
  }
  template.child = helper(node.children[1], depth);
  template.closing = node.children[2].value;

  return template;
};

export const generateMessage = (template, values) => {
  let result: string[] = [];
  result.push(replacer(template.intro, values));

  if (!template.child) return replacer(template.intro, values);

  generateMessageHelper(template.child, values, result);

  result.push(replacer(template.closing, values));
  return result.join('');
};

function generateMessageHelper(node, values, result) {
  if (!values[node.condition]) {
    result.push(node.conditionFalse);
    return;
  } else {
    result.push(node.conditionTrue.replaceAll(`{${node.condition}}`, values[node.condition]));
  }

  if (!node.child) {
    return;
  }

  generateMessageHelper(node.child, values, result);

  result.push(node.closing);
}

const replacer = (initialString: string, values) => {
  const keys = Object.keys(values);

  return keys.reduce((acc, key) => {
    return acc.replaceAll(`{${key}}`, values[key]);
  }, initialString);
};
