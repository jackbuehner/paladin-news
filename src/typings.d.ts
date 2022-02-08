declare module '@cristata/prosemirror-to-html-js' {
  class Node<T = Record<string, unknown>> {
    node: {
      /**
       * The name of the node.
       */
      type: string;

      /**
       * The node's attributes.
       */
      attrs: T;
    };

    /**
     * Whether the node type matches.
     */
    matching(): boolean;

    /**
     * The DOM output [specification](https://prosemirror.net/docs/ref/version/0.18.0.html#model.DOMOutputSpec) for this node. It must be an array.
     */
    toDOM(): DOMOutputSpec;
  }

  class Renderer {
    /**
     * Add instructions for rendering a node.
     */
    addNode(Node): void;

    /**
     * Converts a given prosemirror doc into html.
     * @param value prosemirror doc
     * @returns html string
     */
    render(doc: DocumentJSON): string;
  }

  export default e = {
    /**
     * Extendable class for prosemirror nodes.
     */
    Node,

    /**
     * Class for rendering prosemirror document JSON to HTML.
     */
    Renderer,
  };

  export type DOMOutputSpec = [
    string,
    Record<string, string | number | boolean> | 0 | DOMOutputSpec,
    ...(DOMOutputSpec | 0)[]
  ];

  type DocumentJSON = string | Record<string, unknown>;
}

declare module 'kwesforms' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kwesforms: any;
  export = kwesforms;
}
