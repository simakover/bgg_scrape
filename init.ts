'use strict';

import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';

const USER_URL = 'https://boardgamegeek.com/xmlapi/collection/simakover?wishlistpriority=1&preordered=0';

const options = {
  attributeNamePrefix: 'attr_',
  ignoreAttributes: false,
};

const getWishlist = async () => {
  const response = await fetch(USER_URL);
  const text = await response.text();
  const wishArray: string[] = [];

  const parser = new XMLParser(options);
  const json = parser.parse(text);

  json.items.item.forEach((element: any) => {
    wishArray.push(element.attr_objectid);
  });

  return wishArray;
};

const getCyrNames = async (arr: string[]) => {
  const options = {
    attributeNamePrefix: 'attr_',
    ignoreAttributes: false,
  };

  const namesArray: string[] = [];

  for (let element of arr) {
    const response = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${element}`);
    const text = await response.text();

    const parser = new XMLParser(options);
    const json = parser.parse(text);

    try {
      json.items.item?.name.forEach((el: any) => {
        namesArray.push(el.attr_value);
      });
    } catch (e: any) {
      console.error(e);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return namesArray;
};

const main = async () => {
  const wishGames = await getWishlist();
  const namesArray = await getCyrNames(wishGames);

  const jsonContent = JSON.stringify(namesArray, null, 2);
  fs.writeFile('./data.json', jsonContent, 'utf8', (err: any) => {
    if (err) return console.log(err);
  });

  // console.log(namesArray);
};

main();
