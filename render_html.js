const ParserHTML = require('./parser_html.js');

/**
 * Parsing & Compiling
 */
module.exports = class RenderHTML {
  constructor() {
    
  }

  /**
   * Static Parse Method
   */
  static render(tokens) {

    var metadata='  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    var language="";
    var navbar=""
    var cover=""
    var body="";
    var article_notes="";
    var footer="";

    for (var x in tokens){

      if (tokens[x].type=="language"){
        language=tokens[x].html;
        continue;
      }
  
      if (tokens[x].type=="css"){
        metadata=metadata+tokens[x].html;
        continue;
      }

      if (tokens[x].type=="favicon"){
        metadata=metadata+tokens[x].html;
        continue;
      }
  
      if (tokens[x].type=="title"){
        metadata=metadata+tokens[x].html;
        continue;
      }
   
      if (tokens[x].type=="meta"){
        metadata=metadata+tokens[x].html;
        continue;
      }

      if (tokens[x].type=="navbar"){
        navbar=navbar+tokens[x].html;
        continue;
      }

      if (tokens[x].type=="cover"){
        cover=cover+tokens[x].html;
        continue;
      }

      if (tokens[x].type=="body"){
        body=body+"<div class='literature'>"+tokens[x].html+"\n</div>\n";
        continue;
      }

      if (tokens[x].type=="article_note"){
        article_notes=article_notes+tokens[x].html;
        continue;
      }

      if (tokens[x].type=="footer"){
        footer=footer+tokens[x].html;
        continue;
      }
    }


    let out = '<!DOCTYPE html>\n<html '+language+'>\n\n<head>\n'+metadata +'<head>\n\n<body>\n'+navbar+cover+body+article_notes+footer+ '\n</body>\n</html>';
    return out;
  }


};
