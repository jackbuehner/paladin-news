import Renderer, { DOMOutputSpec } from '@cristata/prosemirror-to-html-js';

class SweepwidgetWidget extends Renderer.Node {
  matching(): boolean {
    return this.node.type === 'sweepwidgetWidget';
  }
  toDOM(): DOMOutputSpec {
    return [
      'iframe',
      {
        srcdoc: `
          <head>
            <script type='text/javascript' src='/js/iframeResizer.contentWindow.min.js'></script>
          </head>
          <body>
            <div id='${this.node.attrs.id}' class='sw_container'></div>
            <script type='text/javascript' src='https://sweepwidget.com/w/j/w_init.js'></script>
          </body>
        `,
        class: 'widget sweepwidgetWidget resize',
      },
    ];
  }
}

export { SweepwidgetWidget };
