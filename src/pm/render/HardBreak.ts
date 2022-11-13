import Renderer, { type DOMOutputSpec } from '@cristata/prosemirror-to-html-js';

class HardBreak extends Renderer.Node {
  matching(): boolean {
    return this.node.type === 'hardBreak';
  }

  selfClosing(): boolean {
    return true;
  }

  toDOM(): DOMOutputSpec {
    return ['br', {}];
  }
}

export { HardBreak };
