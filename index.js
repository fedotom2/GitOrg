'use strict';

const https = require('https');
const git = require('./modules/git.js');
const Clone = git.Clone;

const getLinks = (html) => {
  return html.match(/(?=<[^>]+(?=[\s+\"\']codeRepository[\s+\"\']).+)([^>]+>)/g).map((tag) => {
    return 'https://github.com' + tag.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/)[2];
  });
};

https.get('https://github.com/HowProgrammingWorks', (res) => {
  let data;
  res.setEncoding('utf8');

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const org = new Clone(getLinks(data));
    org.clone();
  });
});
