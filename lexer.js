const Tokenizer = require('./tokenizer.js');
const { block } = require('./rules.js');

/**
 * Block Lexer
 */
module.exports = class Lexer {
  
  constructor(options) {
    this.tokens = [];
    this.tokenizer = new Tokenizer();
  }

  /**
   * Static Lex Method
   */
  static lex(src) {
    const lexer = new Lexer();
    return lexer.lex(src);
  }


  /**
   * Preprocessing
   */
  lex(src) {
    this.createTokens(src, this.tokens);
    return this.tokens;
  }

  /**
   * Lexing
   */
  createTokens(src, tokens = []) {

    let token;

    while (src) {

      // ARTICLE_NOTE
         if (token = this.tokenizer.article_note(src)) {
          src = src.replace(token.raw,'');
          console.log("ENTRO A EXTRA NOTE")
          console.log(token)
          token.tokens = Lexer.lex(token.text)
          tokens.push(token);
          continue;
      }

      // LANGUAGE
      if (token = this.tokenizer.language(src)) {
        src = src.replace(token.metadata,'');
        tokens.push(token);
        continue;
      }

      // CSS
      if (token = this.tokenizer.css(src)) {
        src = src.replace(token.metadata,'');
        tokens.push(token);
        continue;
      }

      // TITLE
      if (token = this.tokenizer.title(src)) {
        src = src.replace(token.metadata,'');
        tokens.push(token);
        continue;
      }

      // FAVICON
      if (token = this.tokenizer.favicon(src)) {
        src = src.replace(token.metadata,'');
        tokens.push(token);
        continue;
      }

      // COVER
      if (token = this.tokenizer.cover(src)) {
        src = src.replace(token.metadata,'');
        tokens.push(token);
        continue;
      }

      // FOOTER
      if (token = this.tokenizer.footer(src)) {
        src = src.replace(token.information,'');
        var items = token.list.split("- ");
        items.shift();
        token.internal=items;

        for (let x in items){
          token.internal[x]= Lexer.lex(items[x]);
        }

        tokens.push(token);
        continue;
      }

      // NAVBAR
      if (token = this.tokenizer.navbar(src)) {
        src = src.replace(token.information,'');
        var items = token.list.split(/\s*- /);
        items.shift();
        token.internal=items;

        for (let x in items){
          token.internal[x]= Lexer.lex(items[x]);
        }

        tokens.push(token);
        continue;
      }

      // META
      if (token = this.tokenizer.meta(src)) {
        src = src.replace(token.metadata,'');
        tokens.push(token);
        continue;
      }

      // BODY
      if (token = this.tokenizer.body(src)) {
        token.internal = Lexer.lex(token.body);
        tokens.push(token);
        break;
      }


      // IMAGE_LINK_SAMETAB
      if (token = this.tokenizer.image_link_sametab(src)) {
        src = src.replace(token.raw,'');
        tokens.push(token);
        continue;
      }


      // IMAGE_LINK
      if (token = this.tokenizer.image_link(src)) {
        src = src.replace(token.raw,'');
        tokens.push(token);
        continue;
      }

      // IMAGE_CAPTION
      if (token = this.tokenizer.image_caption(src)) {
        src = src.replace(token.raw,'');
        tokens.push(token);
        continue;
      }

      // IMAGE_NO_CAPTION
      if (token = this.tokenizer.image_no_caption(src)) {
        src = src.replace(token.raw,'');
        tokens.push(token);
        continue;
      }

      // IMAGE_COVER
      if (token = this.tokenizer.image_cover(src)) {
        src = src.replace(token.raw,'');
        tokens.push(token);
        continue;
      }

      // AUDIO
      if (token = this.tokenizer.audio(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }


      // YOUTUBE VIDEO
      if (token = this.tokenizer.youtube_video(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }


      // HEADING_DESCRIPTION
      if (token = this.tokenizer.heading_description(src)) {
        src = src.substring(token.raw.length);
        token.tokens_title = Lexer.lex(token.text)
        token.tokens_description = Lexer.lex(token.description)
        tokens.push(token);
        continue;
      }


      // HEADING
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        token.tokens = Lexer.lex(token.text)
        tokens.push(token);
        continue;
      }


      // BLOCKQUOTE
      if (token = this.tokenizer.blockquote(src)) {
        src = src.replace(token.raw,'');
        token.tokens = Lexer.lex(token.text)
        tokens.push(token);
        continue;
      }

      // COMMENT
      if (token = this.tokenizer.comment(src)) {
        src = src.replace(token.raw,'');
        tokens.push(token);
        continue;
      }

      // LIST1
      if (token = this.tokenizer.list1(src)) {
        console.log("LISTAAAAAAAA")
        src = src.replace(token.raw,'');
        var items = token.list.split(/\s*- /);
        items.shift();
        token.internal=items;
        
        for (let x in items){
          token.internal[x]= Lexer.lex(items[x]);
        }
        tokens.push(token);
        continue;
      }

      // NOTE
      if (token = this.tokenizer.note(src)) {
        src = src.substring(token.raw.length);
        token.tokens = Lexer.lex(token.text)
        tokens.push(token);
        continue;
      }

      // MARKER
      if (token = this.tokenizer.marker(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // PARAGRAPH
      if (token = this.tokenizer.paragraph(src)) {
        src = src.substring(token.raw.length);
        token.tokens = Lexer.lex(token.text)
        tokens.push(token);
        continue;
      }

      // LINE BREAK
      if (token = this.tokenizer.line_break(src)) {
        src = src.substring(token.raw.length);
        token.tokensPrevious = Lexer.lex(token.previous);
        token.tokensNext = Lexer.lex(token.next)
        tokens.push(token);
        continue;
      }

      
      // LINK_SAMETAB
      if (token = this.tokenizer.link_sametab(src)) {
        src = src.replace(token.raw,'');
        token.tokensPrevious = Lexer.lex(token.previous);
        token.tokensNext = Lexer.lex(token.next)
        tokens.push(token);
        continue;
      }
      
      


      // LINK
      if (token = this.tokenizer.link(src)) {
        src = src.replace(token.raw,'');
        token.tokensPrevious = Lexer.lex(token.previous);
        token.tokensNext = Lexer.lex(token.next)
        tokens.push(token);
        continue;
      }

      // REF
      if (token = this.tokenizer.ref(src)) {
        src = src.substring(token.raw.length);
        token.tokensPrevious = Lexer.lex(token.previous);
        token.tokensText = Lexer.lex(token.text)
        token.tokensNext = Lexer.lex(token.next)
        tokens.push(token);
        continue;
      }

      // BOLD_ITALIC
      if (token = this.tokenizer.bold_italic(src)) {
        src = src.substring(token.raw.length);
        token.tokensPrevious = Lexer.lex(token.previous);
        token.tokensText = Lexer.lex(token.text)
        token.tokensNext = Lexer.lex(token.next)
        tokens.push(token);
        continue;
      }

      // BOLD
      if (token = this.tokenizer.bold(src)) {
        src = src.substring(token.raw.length);
        token.tokensPrevious = Lexer.lex(token.previous);
        token.tokensText = Lexer.lex(token.text)
        token.tokensNext = Lexer.lex(token.next)
        tokens.push(token);
        continue;
      }

      // ITALIC
      if (token = this.tokenizer.italic(src)) {
        src = src.substring(token.raw.length);
        token.tokensPrevious = Lexer.lex(token.previous);
        token.tokensText = Lexer.lex(token.text)
        token.tokensNext = Lexer.lex(token.next)
        tokens.push(token);
        continue;
      }

      // STRIKETHROUGH

      if (token = this.tokenizer.strikethrough(src)) {
        src = src.substring(token.raw.length);
        token.tokensPrevious = Lexer.lex(token.previous);
        token.tokensText = Lexer.lex(token.text)
        token.tokensNext = Lexer.lex(token.next)
        tokens.push(token);
        continue;
      }

      // TEXT
      if (token = this.tokenizer.text(src)) {
        tokens.push(token);
        break;
      }
      

      if(true){
        console.log("Sin match")
        break;
      }

    }

    return tokens;
  }

 


};
