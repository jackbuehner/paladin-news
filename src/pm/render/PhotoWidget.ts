import Renderer from '@cristata/prosemirror-to-html-js';

class PhotoWidget extends Renderer.Node {
  matching() {
    return this.node.type === 'photoWidget';
  }
  toDOM() {
    return [
      'figure',
      { class: 'widget photo' },
      [
        'div',
        {
          class: 'img-wrapper',
          'data-photo-credit': !this.node.attrs.showCaption ? this.node.attrs.photoCredit : '',
          style: 'margin: 20px 0; display: flex; position: relative; align-items: start;',
        },
        [
          'img',
          {
            src: this.node.attrs.photoUrl,
            alt: '',
            style: 'width: 100%;',
          },
        ],
      ],
      [
        'figcaption',
        {
          'data-photo-credit': this.node.attrs.showCaption ? this.node.attrs.photoCredit : '',
          style: `
            ${
              this.node.attrs.showCaption
                ? `
                  display: block;
                  text-align: center;
                  margin: -10px 0 10px 0;
                `
                : `
                  display: block;
                  text-align: right;
                  margin: -26px 0 10px 0;
                `
            }
            color: #666;
            font-size: 90%;
            text-align: center;
          `,
        },
        this.node.attrs.showCaption ? 0 : 1,
      ],
    ];
  }
}

export { PhotoWidget };
