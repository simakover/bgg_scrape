'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_xml_parser_1 = require("fast-xml-parser");
const USER_URL = 'https://boardgamegeek.com/xmlapi/collection/simakover?wishlistpriority=1&preordered=0';
const options = {
    attributeNamePrefix: 'attr_',
    ignoreAttributes: false,
};
const getWishlist = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(USER_URL);
    const text = yield response.text();
    const wishArray = [];
    const parser = new fast_xml_parser_1.XMLParser(options);
    const json = parser.parse(text);
    json.items.item.forEach((element) => {
        wishArray.push(element.attr_objectid);
    });
    return wishArray;
});
const getCyrNames = (arr) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const options = {
        attributeNamePrefix: 'attr_',
        ignoreAttributes: false,
    };
    const namesArray = [];
    for (let element of arr) {
        const response = yield fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${element}`);
        const text = yield response.text();
        const parser = new fast_xml_parser_1.XMLParser(options);
        const json = parser.parse(text);
        try {
            (_a = json.items.item) === null || _a === void 0 ? void 0 : _a.name.forEach((el) => {
                namesArray.push(el.attr_value);
            });
        }
        catch (e) {
            console.error(e);
        }
        yield new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return namesArray;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const wishGames = yield getWishlist();
    const namesArray = yield getCyrNames(wishGames);
    console.log(namesArray);
});
main();
