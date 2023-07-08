//@ts-nocheck
const helper = (node, depth) => {
  let result = {};
  result.IF = node.children[0].lastChild.value.slice(1, -1);
  result.THEN = node.children[1].lastChild.value;
  if (depth === 1) {
    result.ELSE = node.children[2].lastChild.value;
  } else {
    result.child = helper(node.children[2], depth - 1);
    result.BOTTOM = node.children[3].lastChild.value;
    result.ELSE = node.children[4].lastChild.value;
  }
  return result;
};

export const generateTemplate: (node: HTMLDivElement, depth: number) => string[] = (
  node,
  depth
) => {
  let template = {};
  template.TOP = node.children[0].value;
  if (depth === 0) {
    return template;
  }
  template.child = helper(node.children[1], depth);
  template.BOTTOM = node.children[2].value;

  return template;
};

export const generateMessage = (template, values) => {
  let result: string[] = [];
  result.push(replacer(template.TOP, values));

  if (!template.child) return replacer(template.TOP, values);

  generateMessageHelper(template.child, values, result);

  result.push(replacer(template.BOTTOM, values));
  return result.join('');
};

function generateMessageHelper(node, values, result) {
  if (!values[node.IF]) {
    result.push(node.ELSE);
    return;
  } else {
    result.push(node.THEN.replaceAll(`{${node.IF}}`, values[node.IF]));
  }

  if (!node.child) {
    return;
  }

  generateMessageHelper(node.child, values, result);

  result.push(node.BOTTOM);
}

const replacer = (initialString: string, values) => {
  const keys = Object.keys(values);

  let result = keys.reduce((acc, key) => {
    return acc.replaceAll(`{${key}}`, values[key]);
  }, initialString);

  return result.replaceAll(/{(.*?)}/g, '');
};
