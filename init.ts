'use strict';

import { XMLParser } from 'fast-xml-parser';

const getWishlist = async () => {
  let response = await fetch('https://boardgamegeek.com/xmlapi/collection/simakover?wishlistpriority=1&preordered=0');
  let text = await response.text();
  const wishArray: string[] = [];

  const parser = new XMLParser();
  const json = parser.parse(text);

  json.items.item.forEach((element: any) => {
    wishArray.push(element.name);
  });

  return wishArray;
};

const main = async () => {
  const wishGames = await getWishlist();
  console.log(wishGames);
};

main();
