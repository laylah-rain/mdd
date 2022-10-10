  
/**
 * Parsing & Compiling
 */
module.exports = class ParserLATEX {
  constructor() {
    
  }

  /**
   * Static Parse Method
   */
  static parse(tokens) {
    const parser = new ParserLATEX();
    return parser.parse(tokens);
  }


  /**
   * Parse Loop
   */
  parse(tokens) {
    let out = '';
    let i, token, txt, sect,size;
    const l = tokens.length;

    for (i = 0; i < l; i++) {
      token = tokens[i];

      switch (token.type) {

        case 'document': {
          const interior= ParserLATEX.parse(token.tokens)
          txt='\\begin{document}\n\n'+interior+'\\end{document}'
          out += txt;
          continue;
        }

        case 'metadata': {
          const interiorBody= ParserLATEX.parse(token.tokens2)
          txt=interiorBody
          out += txt;
          continue;
        }

        case 'literature': {
          const interior= ParserLATEX.parse(token.tokens)
          txt=interior;
          out += txt;
          continue;
        }

        case 'details': {
          // \chapter{Let's begin}
          const interior= ParserLATEX.parse(token.tokens);
          txt='\\section*{'+token.title+'}\n\n'+interior;
          out += txt;
          continue;
        }

        
        case 'heading': {
          if(token.depth==1) {sect= "\\section*{"}
          if(token.depth==2) {sect= "\\subsection*{"}
          if(token.depth>=3) {sect= "\\subsubsection*{"}
          txt=sect + token.text + '}\n\n';
          out += txt;
          continue;
        }

        case 'image_caption': {

          if(token.width.slice(token.width.length - 1)=="%"){
            size= parseInt(token.width)/100+"\\textwidth";
          }

          else{
            size=token.width;
          }
          
          txt= "\\begin{figure}[htb]\n \\centering \n \\includegraphics[width="+size+"]{"+token.link+"}\n \\caption{"+token.note+"}\n\\end{figure}\n\n"
          out += txt;
          continue;
        }

        case 'image_no_caption': {
          continue;
        }

        case 'image_cover': {
          txt="\\includepdf{"+token.link+"}\n\n";
          out += txt;
          continue;
        }

        case 'poem': {
          const interior= ParserLATEX.parse(token.tokens);
          txt=interior;
          out += txt;
          continue;
        }
        

        case 'note': {
          const interior= ParserLATEX.parse(token.tokens);
          txt=interior;
          out += txt;
          continue;
        }

        case 'paragraph': {
          const interior= ParserLATEX.parse(token.tokens);
          txt='\\par '+ interior+ '\n\n';
          out += txt;
          continue;
        }

        case 'link': {
          continue;
        }


        case 'ref': {
          const previous= ParserLATEX.parse(token.tokensPrevious)
          const text= ParserLATEX.parse(token.tokensText);
          const next= ParserLATEX.parse(token.tokensNext);
          txt=previous+text+next;
          out += txt;
          continue;
        }


        case 'bold_italic': {
          const previous= ParserLATEX.parse(token.tokensPrevious)
          const text= ParserLATEX.parse(token.tokensText);
          const next= ParserLATEX.parse(token.tokensNext);
          txt=previous+'\\textbf{\\textit{'+text+'}}'+next;
          out += txt;
          continue;
        }

        case 'bold': {
          const previous= ParserLATEX.parse(token.tokensPrevious)
          const text= ParserLATEX.parse(token.tokensText);
          const next= ParserLATEX.parse(token.tokensNext);
          txt=previous+'\\textbf{'+text+'}'+next;
          out += txt;
          continue;
        }

        case 'italic': {
          const previous= ParserLATEX.parse(token.tokensPrevious)
          const text= ParserLATEX.parse(token.tokensText);
          const next= ParserLATEX.parse(token.tokensNext);
          txt=previous+'\\textit{'+text+'}'+next;
          out += txt;
          continue;
        }

        case 'text': {
          out += token.text;
          continue;
        }

        continue;
        


      }
    }

    return out;
  }


};
