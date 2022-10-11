  
/**
 * Parsing & Compiling
 */
module.exports = class ParserHTML {
  constructor() {
    
  }

  /**
   * Static Parse Method
   */
  static parse(tokens) {
    const parser = new ParserHTML();
    return parser.parse(tokens);
  }


  /**
   * Parse Loop
   */
  parse(tokens) {
    //console.log(tokens)
    let out = '';
    let i, token, txt;
    const l = tokens.length;

    for (i = 0; i < l; i++) {
      token = tokens[i];

      switch (token.type) {


        // language
        case 'language': {
          txt= 'lang='+token.language;
          out += txt;
          continue;
        }

        // cover
        case 'cover': {
          txt='<img src="'+token.cover+'" alt="cover" width="100%"></img>\n';
          out += txt;
          continue;
        }


        // title
        case 'title': {
          txt='  <title>'+ token.title + '</title>\n';
          out += txt;
          continue;
        }

        // favicon
         case 'favicon': {
          txt='  <link rel="icon" type="image/x-icon"  href="'+ token.favicon + '">\n';
          out += txt;
          continue;
        }

        // css
        case 'css': {
          txt='  <link rel="stylesheet"  href="'+ token.css + '">\n';
          out += txt;
          continue;
        }

        // footer
        case 'footer': {
          var interior="";
          for (let x in token.internal){
            interior=interior+ '    '+ ParserHTML.parse(token.internal[x])+'\n';
          }
          txt='\n<footer>\n    '+ interior +'\n</footer>\n\n';
          out += txt;
          continue;
        }

        // navbar
        case 'navbar': {
          var interior="";
          for (let x in token.internal){
            interior=interior+ '    '+ ParserHTML.parse(token.internal[x])+'\n';
          }
          txt='\n<div class="topnav">\n   <div>\n'+ interior +'   </div>\n</div>\n\n';
          out += txt;
          continue;
        }

        // meta
        case 'meta': {
          txt='  <meta name="'+ token.meta + '" content="'+token.information+'">\n';
          out += txt;
          continue;
        }

        // body
        case 'body': {
          const interior= ParserHTML.parse(token.internal)
          txt=interior;
          out += txt;
          continue;
        }

        case 'article_note': {
          //console.log(token)
          const interior= ParserHTML.parse(token.tokens);
          txt='<div class="details">\n<details>\n  <summary>'+token.title+'</summary>\n<div>\n'+interior+'</div>\n</details>\n</div>\n\n';
          out += txt;
          continue;
        }

        case 'heading_description': {
          const title= ParserHTML.parse(token.tokens_title)
          const description= ParserHTML.parse(token.tokens_description);
          txt="  <div class='header'> <div class='title'>"+ title+ "</div> <div class='description'> " + description + "</div> </div>"
          out += txt;
          continue;
        }


    

        case 'heading': {
          const interior= ParserHTML.parse(token.tokens)
          txt='  <h' + token.depth + '>' + interior + '</h' + token.depth + '>\n';
          out += txt;
          continue;
        }

        case 'audio': {
          txt='<div class="audio">\n<audio controls>\n<source src="'+token.link+'" alt="'+token.title+'"type="audio/mpeg">\n</audio>\n</div>';
          out += txt;
          continue;
        }

        case 'image_link_sametab': {
          txt='<a class="imageButton" href="'+token.external+'"><img src="'+token.link+'" alt="'+token.title+'"width="'+token.width+'"></img></a>\n';
          out += txt;
          continue;
        }

        case 'image_link': {
          txt='<a target="_blank" href="'+token.external+'"><img src="'+token.link+'" alt="'+token.title+'"width="'+token.width+'"></img></a>\n';
          out += txt;
          continue;
        }

        case 'image_caption': {
          txt='<figure>\n<img src="'+token.link+'" alt="'+token.title+'"width="'+token.width+'">\n<figcaption>'+token.note+'</figcaption>\n</figure>\n';
          out += txt;
          continue;
        }

        case 'image_no_caption': {
          txt='<img src="'+token.link+'" alt="'+token.title+'"width="'+token.width+'"></img>\n';
          out += txt;
          continue;
        }

        case 'image_cover': {
          continue;
        }

        case 'blockquote': {
          const interior=ParserHTML.parse(token.tokens);
          txt='  <blockquote>\n<div>\n' +interior+'\n</div>\n</blockquote>\n';
          out += txt;
          continue;
        }

        case 'comment': {
          txt='<div class="comment"\n'+ token.text+'\n</div>';
          out += txt;
          continue;
        }


        case 'list1': {
          var interior="";
          console.log("LEER ACA")
          console.log(token.internal);
          for (let x in token.internal){
            interior=interior+ '    <li>'+ ParserHTML.parse(token.internal[x])+'  </li>\n';
          }
          txt='  <ul>\n' +interior+'  </ul>\n';
          out += txt;
          continue;
        }



        case 'note': {
          const interior= ParserHTML.parse(token.tokens);
          txt='<p id="n'+token.id+'">'+token.id+". "+interior +'<a class="ref" href="#ref'+token.id+'">&#8617</a></p>\n';
          out += txt;
          continue;
        }

        case 'marker': {
          txt='<div class="marker">* * *</div>\n';
          out += txt;
          continue;
        }

        case 'paragraph': {
          const interior= ParserHTML.parse(token.tokens);
          txt='  <p>' +interior +'</p>\n';
          out += txt;
          continue;
        }

        case 'line_break': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<br>'+next;
          out += txt;
          continue;
        }
  

        case 'bold': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<b>'+text+'</b>'+next;
          out += txt;
          continue;
        }

        case 'link_sametab': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<a href="'+token.link+'">'+token.title+'</a>'+next;
          out += txt;
          continue;
        }

        case 'link': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<a href="'+token.link+'" target="_blank">'+token.title+'</a>'+next;
          out += txt;
          continue;
        }


        case 'ref': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<a class="ref" href="#n'+token.id+'" id="ref'+token.id+'">'+text+'<sup>'+token.id+'</sup></a>'+next;
          out += txt;
          continue;
        }


        case 'bold_italic': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<b><i>'+text+'</i></b>'+next;
          out += txt;
          continue;
        }

        case 'bold': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<b>'+text+'</b>'+next;
          out += txt;
          continue;
        }

        case 'italic': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<i>'+text+'</i>'+next;
          out += txt;
          continue;
        }

        case 'strikethrough': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<del>'+text+'</del>'+next;
          out += txt;
          continue;
        }

        case 'text': {
          out += token.text;
          continue;
        }
        


      }
    }

    return out;
  }


};
