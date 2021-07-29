export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export async function createNode(component, { data = {}, meta = {}, x = 0, y = 0 }) {
    const node = await component.createNode(deepCopy(data));

    node.meta = Object.assign(deepCopy(meta), node.meta);
    node.position[0] = x;
    node.position[1] = y;
    
    return node;
}

export function traverse(items, callback, path = []) {
    if (typeof items !== 'object') return;

    Object.keys(items).map(key => {
        if (typeof items[key] === 'function')
            callback(key, items[key], path)
        else 
            traverse(items[key], callback, [...path, key])
    })
}

export function fitViewport([x, y], element) {
    return [
        Math.min(x, window.innerWidth - element.clientWidth),
        Math.min(y, window.innerHeight - element.clientHeight)
    ]
}

// Cloneを外部から実行できる
export async function cloneNode(editor, node, isTrigger) {
    const { name, position: [x, y], ...params } = node;
    const component = editor.components.get(name);
    const nodeFromClone = await createNode(component, { ...params, x: x + 10, y: y + 10 });

    editor.addNode(nodeFromClone);
    
    const obj = { 
      node: node,
      nodeFromClone: nodeFromClone,
    };
    
    if (isTrigger) { // トリガーを無効化することでイベント内でさらにクローンしたとき無限ループを防げる
      editor.trigger('nodeclone', obj);
    }
    
    return nodeFromClone;
}