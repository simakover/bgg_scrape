'use strict';

import { XMLParser } from 'fast-xml-parser';

const main = async () => {
  let response = await fetch('https://boardgamegeek.com/xmlapi/collection/simakover?wishlistpriority=1');
  let text = await response.text();

  const parser = new XMLParser();
  const json = parser.parse(text);

  console.log(`First book: `, json.items.item[0].name);

  //   let xmlDoc = parser.parseFromString(text, 'text/xml');
  //   const game = xmlDoc.getElementsByTagName('name ')[0];
  //   console.log(game);
};

main();
