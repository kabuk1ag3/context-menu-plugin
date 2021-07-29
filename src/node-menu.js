import Menu from './menu/index';
// import { createNode, traverse, cloneNode } from './utils';
import { traverse, cloneNode } from './utils';

export default class NodeMenu extends Menu {
    constructor(editor, props, vueComponent, nodeItems, renameNodeMenu) {
        super(editor, props, vueComponent);

        if (nodeItems['Delete'] !== false) {
            this.addItem(renameNodeMenu('Delete'), ({ node }) => editor.removeNode(node));
        }
        if (nodeItems['Clone'] !== false) {
            this.addItem(renameNodeMenu('Clone'), async (args) => {
                // const { name, position: [x, y], ...params } = args.node;
                // const component = editor.components.get(name);
                // const node = await createNode(component, { ...params, x: x + 10, y: y + 10 });

                // editor.addNode(node);
                
                // editor.trigger('nodeclone', node);
                cloneNode(editor, args.node);
            });
        }

        traverse(nodeItems, (name, func, path) => this.addItem(renameNodeMenu(name), func, path))
    }
}
