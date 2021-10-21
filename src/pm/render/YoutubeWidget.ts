import Renderer from '@cristata/prosemirror-to-html-js';

class YoutubeWidget extends Renderer.Node {
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

export { YoutubeWidget };
