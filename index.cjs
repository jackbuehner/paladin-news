const Renderer = require('@cristata/prosemirror-to-html-js').Renderer;
const Node = require('@cristata/prosemirror-to-html-js').Node;

class YoutubeWidget extends Node {
  matching() {
    return this.node.type === 'youtubeWidget';
  }
  toDOM() {
    return [
      'div',
      { class: 'widget youtube' },
      [
        'iframe',
        {
          style: 'aspect-ratio: 16/9; margin: 20px 0;',
          width: '100%',
          src: `https://www.youtube-nocookie.com/embed/${this.node.attrs.videoId}?modestbranding=1`,
          frameborder: 0,
          allow: 'autoplay; encrypted-media',
          allowfullscreen: true,
        },
      ],
      [
        'div',
        { style: 'margin: -10px 0 10px 0; color: #666; font-size: 90%; text-align: center;' },
        0,
      ],
    ];
  }
}

class PhotoWidget extends Node {
  matching() {
    return this.node.type === 'photoWidget';
  }
  toDOM() {
    return [
      'figure',
      { class: 'widget photo' },
      [
        'img',
        {
          src: this.node.attrs.photoUrl,
          alt: '',
        },
      ],
      [
        'figcaption',
        {
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
        this.node.attrs.showCaption ? ['span', {}, 0] : ['span'],
        [
          'span',
          {
            style: `display: inline; margin-top: 4px; font-family: Georgia,Times,'Times New Roman',serif; color: #a7a7a7; font-size: 13px; cursor: default; margin-left: 6px;`,
          },
          this.node.attrs.photoCredit,
        ],
      ],
    ];
  }
}

const renderer = new Renderer();
renderer.addNode(YoutubeWidget);
renderer.addNode(PhotoWidget);
const rendered = renderer.render({
  type: 'doc',
  content: [
    {
      type: 'photoWidget',
      attrs: { photoId: '6170d9f47a1fde001629f757', showCaption: true },
      content: [{ type: 'text', text: 'Caption' }],
    },
    /*{
      type: 'paragraph',
      attrs: {
        'data-test': true,
      },
      content: [
        {
          type: 'text',
          text: 'Windows 11 experience upgrade video',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'italic',
            },
          ],
        },
      ],
    },
    {
      type: 'youtubeWidget',
      attrs: {
        videoId: 'Ttkq_mh7bKg',
        showCaption: true,
      },
      content: [
        {
          type: 'text',
          text: 'Windows 11 experience upgrade video',
          marks: [
            {
              type: 'bold',
            },
            {
              type: 'italic',
            },
          ],
        },
      ],
    },*/
  ],
});
console.log(rendered);
