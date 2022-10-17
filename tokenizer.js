const { block } = require('./rules.js');

/**
 * Tokenizer
 */
module.exports = class Tokenizer {

  constructor() {
    this.rules=block;
  }

  language(src) {
    const cap = this.rules.language.exec(src);
    if (cap) {
      return {
        type: 'language',
        raw: cap[0], 
        metadata: cap[1], 
        language: cap[2], 
      };
    }
  }

  cover(src) {
    const cap = this.rules.cover.exec(src);
    if (cap) {
      return {
        type: 'cover',
        raw: cap[0], 
        metadata: cap[1], 
        cover: cap[2], 
      };
    }
  }

  title(src) {
    const cap = this.rules.title.exec(src);
    if (cap) {
      return {
        type: 'title',
        raw: cap[0], 
        metadata: cap[1], 
        title: cap[2], 
      };
    }
  }

  favicon(src) {
    const cap = this.rules.favicon.exec(src);
    if (cap) {
      return {
        type: 'favicon',
        raw: cap[0], 
        metadata: cap[1], 
        favicon: cap[2], 
      };
    }
  }

  css(src) {
    const cap = this.rules.css.exec(src);
    if (cap) {
      return {
        type: 'css',
        raw: cap[0], 
        metadata: cap[1], 
        css: cap[2], 
      };
    }
  }

  footer(src) {
    const cap = this.rules.footer.exec(src);
    if (cap) {
      return {
        type: 'footer',
        raw: cap[0], 
        information: cap[1], 
        list: cap[2], 
      };
    }
  }

  navbar(src) {
    const cap = this.rules.navbar.exec(src);
    if (cap) {
      return {
        type: 'navbar',
        raw: cap[0], 
        information: cap[1], 
        list: cap[2], 
      };
    }
  }

  meta(src) {
    const cap = this.rules.meta.exec(src);
    if (cap) {
      return {
        type: 'meta',
        raw: cap[0],
        metadata: cap[1],
        meta: cap[2],
        information: cap[3],
      };
    }
  }

  body(src) {
    const cap = this.rules.body.exec(src);
    if (cap) {
      return {
        type: 'body',
        raw: cap[0],
        body: cap[1]
      };
    }
  }


  article_note(src){
    const cap = this.rules.article_note.exec(src);
    if (cap) {
      return {
        type: 'article_note',
        raw: cap[0],
        title: cap[1],
        text: cap[2]
      };
    }
  }


  heading_description(src) {
    const cap = this.rules.heading_description.exec(src);
    if (cap) {
      return {
        type: 'heading_description',
        raw: cap[0],
        depth: cap[1].length,
        text: cap[2],
        description: cap[3]
      };
    }
  }

  heading(src) {
    const cap = this.rules.heading.exec(src);
    if (cap) {
      return {
        type: 'heading',
        raw: cap[0],
        depth: cap[1].length,
        text: cap[2]
      };
    }
  }

  audio(src) {
    const cap = this.rules.audio.exec(src);
    if (cap) {
      return {
        type: 'audio',
        raw: cap[0],
        title: cap[1],
        link: cap[2]
      };
    }
  }

  youtube_video(src) {
    const cap = this.rules.youtube_video.exec(src);
    if (cap) {
      return {
        type: 'youtube_video',
        raw: cap[0],
        title: cap[1],
        link: cap[2]
      };
    }
  }

  image_link_sametab(src) {
    const cap = this.rules.image_link_sametab.exec(src);
    if (cap) {
      return {
        type: 'image_link_sametab',
        raw: cap[0],
        title: cap[1],
        link:cap[2],
        width:cap[3],
        external:cap[4]
      };
    }
  }

  image_link(src) {
    const cap = this.rules.image_link.exec(src);
    if (cap) {
      return {
        type: 'image_link',
        raw: cap[0],
        title: cap[1],
        link:cap[2],
        width:cap[3],
        external:cap[4]
      };
    }
  }


  image_caption(src) {
    const cap = this.rules.image_caption.exec(src);
    if (cap) {
      return {
        type: 'image_caption',
        raw: cap[0],
        title: cap[1],
        link:cap[2],
        width:cap[3],
        note:cap[4]
      };
    }
  }

  image_no_caption(src) {
    const cap = this.rules.image_no_caption.exec(src);
    if (cap) {
      return {
        type: 'image_no_caption',
        raw: cap[0],
        title: cap[1],
        link:cap[2],
        width:cap[3]
      };
    }
  }

  image_cover(src) {
    const cap = this.rules.image_cover.exec(src);
    if (cap) {
      return {
        type: 'image_cover',
        raw: cap[0],
        link:cap[1]
      };
    }
  }


  blockquote(src) {
    const cap = this.rules.blockquote.exec(src);
    if (cap) {
      const text3= cap[0].replace(/> /gm, '');
      const text = text3.replace(/>/gm, '');

      return {
        type: 'blockquote',
        raw: cap[0],
        text
      };
    }
  }

  comment(src) {
    const cap = this.rules.comment.exec(src);
    if (cap) {
      const text= cap[1].replace(/\</gm, "&lt;").replace(/\n/gm, "<br>").replace(/ /gm, "&nbsp;");;

      return {
        type: 'comment',
        raw: cap[0],
        text: text
      };
    }
  }

  list1(src) {
    const cap = this.rules.list1.exec(src);
    if (cap) {
      return {
        type: 'list1',
        raw: cap[0],
        list: cap[1],
      };
    }
  }


  note(src) {
    const cap = this.rules.note.exec(src);
    if (cap) {
      return {
        type: 'note',
        raw: cap[0],
        id: cap[1],
        text: cap[2]
      };
    }
  }

  marker(src) {
    const cap = this.rules.marker.exec(src);
    if (cap) {
      return {
        type: 'marker',
        raw: cap[0]
      };
    }
  }



  paragraph(src) {
    const cap = this.rules.paragraph.exec(src);
    if (cap) {
      return {
        type: 'paragraph',
        raw: cap[0],
        text: cap[1]
      };
    }
  }

  line_break(src) {
    const cap = this.rules.line_break.exec(src);
    if (cap) {
      return {
        type: 'line_break',
        raw: cap[0],
        previous: cap[1],
        next: cap[2],
      };
    }
  }

  link_sametab(src) {
    const cap = this.rules.link_sametab.exec(src);
    if (cap) {

      if(cap[2]==''){
        cap[2]=cap[3];
      }

      return {
        type: 'link_sametab',
        raw: cap[0],
        previous: cap[1],
        title:cap[2],
        link:cap[3],
        next: cap[4],
      };
    }
  }

  link(src) {
    const cap = this.rules.link.exec(src);
    if (cap) {

      if(cap[2]==''){
        cap[2]=cap[3];
      }

      return {
        type: 'link',
        raw: cap[0],
        previous: cap[1],
        title:cap[2],
        link:cap[3],
        next: cap[4],
      };
    }
  }

  ref(src) {
    const cap = this.rules.ref.exec(src);
    if (cap) {
      return {
        type: 'ref',
        raw: cap[0],
        previous: cap[1],
        text: cap[2],
        id: cap[3],
        next: cap[4],
      };
    }
  }

  bold_italic(src) {
    const cap = this.rules.bold_italic.exec(src);
    if (cap) {
      return {
        type: 'bold_italic',
        raw: cap[0],
        previous: cap[1],
        text: cap[2],
        next: cap[3],
      };
    }
  }

  bold(src) {
    const cap = this.rules.bold.exec(src);
    if (cap) {
      return {
        type: 'bold',
        raw: cap[0],
        previous: cap[1],
        text: cap[2],
        next: cap[3],
      };
    }
  }

  italic(src) {
    const cap = this.rules.italic.exec(src);
    if (cap) {
      return {
        type: 'italic',
        raw: cap[0],
        previous: cap[1],
        text: cap[2],
        next: cap[3],
      };
    }
  }

  strikethrough(src) {
    const cap = this.rules.strikethrough.exec(src);
    if (cap) {
      return {
        type: 'strikethrough',
        raw: cap[0],
        previous: cap[1],
        text: cap[2],
        next: cap[3],
      };
    }
  }

  text(src) {
      return {
        type: 'text',
        raw: src,
        text: src
      };
  }


};
