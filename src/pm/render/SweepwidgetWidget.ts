import Renderer from 'prosemirror-to-html-js';

class SweepwidgetWidget extends Renderer.Node {
  matching() {
    return this.node.type === 'sweepwidgetWidget';
  }
  tag() {
    return {
      tag: 'iframe',
      attrs: {
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
    };
  }
}

export { SweepwidgetWidget };
