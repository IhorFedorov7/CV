export function jsonToHtml(node) {
    if (typeof node === 'string') return node;

    const { tag, attrs = {}, children = [] } = node;
    
    const attrString = Object.entries(attrs)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('');
    
    const childrenHtml = children.map(jsonToHtml).join('');

    return `<${tag}${attrString}>${childrenHtml}</${tag}>`;
  }