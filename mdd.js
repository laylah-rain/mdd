const Lexer = require('./lexer.js');
const GeneratorHTML = require('./generator_html.js');
const RenderHTML = require('./render_html.js');
const ParserLATEX = require('./parser_latex.js');
const { block } = require('./rules.js');


function mdd(src, format) {
  
  var tokens;
  
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }


  // Realiza la operación
  try {

    dictionary_tokens = Lexer.lex(src);
    console.log(dictionary_tokens);
    dictionary_html = GeneratorHTML.generator(dictionary_tokens)
    console.log(dictionary_html);
    html = RenderHTML.render(dictionary_html);
    console.log(html);
    return html;
  
  } catch (e) {
    e.message += '\nHay un error en el sistema';
    throw e;
  }
}

module.exports = {transform: mdd};