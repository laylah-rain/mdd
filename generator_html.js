const ParserHTML = require('./parser_html.js');

/**
 * Parsing & Compiling
 */
module.exports = class GeneratorHTML {
  constructor() {
    
  }

  /**
   * Static Parse Method
   */
  static generator(tokens) {

    var dictionary_html= [];

    for (var x in tokens){
      var limitedTokens=[tokens[x]];
      dictionary_html.push({type: tokens[x].type, html: ParserHTML.parse(limitedTokens)})
    }

    var out = dictionary_html;
    return out;
  }


};
