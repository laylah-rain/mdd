
/**
 * Block-Level Grammar
 */
const block = {

  language: /\s*---\n[\s\S]+(LANGUAGE:([^\n]*))[\s\S]*?---/,
  cover: /\s*---\n[\s\S]+(COVER:([^\n]*))[\s\S]*?---/,
  favicon: /\s*---\n[\s\S]+(FAVICON:([^\n]*))[\s\S]*?---/,
  title: /\s*---\n[\s\S]+(TITLE:([^\n]*))[\s\S]*?---/,
  css: /\s*---\n[\s\S]+(CSS:([^\n]*))[\s\S]*?---/,
  footer: /\s*---\n[\s\S]+(FOOTER:((\s*- [^\n]*)+))[\s\S]+?---\n/,
  navbar: /\s*---\n[\s\S]+(NAVBAR:((\s*- [^\n]*)+))[\s\S]+?---\n/,
  meta: /\s*---\n[\s\S]+\n(([\s\S]+):([^\n]*))[\s\S]*?---/,
  body: /\s*---\n+\s*---([\s\S]+)/,
  image_link_sametab: /^\s*!\[(.*?)]\((.*?)\)\((.*?)\)\((.*?)\){sametab}\s*/,
  image_link: /^\s*!\[(.*?)]\((.*?)\)\((.*?)\)\((.*?)\)\s*/,
  image_caption:/^\s*!\[(.*?)]\((.*?)\)\((.*?)\) *\n\*(.*)\*\s*/,
  image_no_caption:/^\s*!\[(.*?)]\((.*?)\)\((.*?)\)\s*/,
  image_cover:/^\s*!\[(.*?)]\s*/,
  audio:/^\s*!!\[(.*?)]\((.*?)\)\s*/,
  youtube_video:/^\s*!!!\[(.*?)]\((.*?)\)\s*/,
  article_note: /\s*```+\s*note\s# (.*)\s*((.|\s)*?\n)```\s*/,
  heading_description: /^\s*(#{1,6}) +([^\n]*)\n([^\n]+)\n+/,
  heading: /^\s*(#{1,6}) +([^\n]*)(?<!\s)\s*/,
  blockquote:/^\s*(>[^\n]*(?:\n|$))+\s*/,
  comment:/^\s*```((?:\s|.)*?)```\s*/,
  list1:/^\s*((- [^\n]*(?:\n|$))+)/,
  note:/^\s*\[\^(.*?)\]: (.*)\s*/,
  marker: /^\s*\* \* \*\s*/,
  paragraph:/^([\S\s]+?)\n\n+/,
  line_break:/(.*)\n(.*)/,
  link_sametab:/(.*)\[(.*?)]\((.*?)\){sametab}(.*)/,
  link:/(.*)\[(.*?)]\((.*?)\)(.*)/,
  ref: /^(.*)\<(.*?)\[\^(.*?)\]\>(.*)/,
  bold_italic: /(.*)\*\*\*(.*?)\*\*\*(.*)/,
  bold: /(.*)\*\*(.*?)\*\*(.*)/,
  italic: /(.*)\*(.*?)\*(.*)/,
  strikethrough: /(.*)\~\~(.*?)\~\~(.*)/

};


module.exports = {
  block,
};
