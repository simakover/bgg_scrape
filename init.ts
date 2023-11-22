'use strict';

import { XMLParser } from 'fast-xml-parser';

const main = async () => {
  let response = await fetch('https://boardgamegeek.com/xmlapi/collection/simakover?wishlistpriority=1');
  let text = await response.text();

  const parser = new XMLParser();
  const json = parser.parse(text);

  json.items.item.forEach((element: any) => {
    console.log(element.name);
  });
};

main();
