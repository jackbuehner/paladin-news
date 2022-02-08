import Renderer, { DOMOutputSpec } from '@cristata/prosemirror-to-html-js';

interface PhotoWidgetAttrs {
  position?: string;
  showCaption?: boolean;
  photoCredit?: string;
  photoUrl: string;
}

class PhotoWidget extends Renderer.Node<PhotoWidgetAttrs> {
  matching(): boolean {
    return this.node.type === 'photoWidget';
  }
  toDOM(): DOMOutputSpec {
    const position: string = this.node.attrs.position || 'center';
    return [
      'figure',
      {
        class: `widget photo position-${position}`,
      },
      [
        'div',
        {
          class: 'img-wrapper',
          'data-photo-credit': !this.node.attrs.showCaption ? this.node.attrs.photoCredit : '',
          style: `margin: 0; display: flex; position: relative; align-items: start;`,
        },
        [
          'img',
          {
            src: this.node.attrs.photoUrl,
            alt: '',
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
                  margin: 10px 0 10px 0;
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
        this.node.attrs.showCaption ? 0 : undefined,
      ],
    ];
  }
}

export { PhotoWidget };
