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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch('https://boardgamegeek.com/xmlapi/collection/simakover?wishlistpriority=1');
    let text = yield response.text();
    const parser = new fast_xml_parser_1.XMLParser();
    const json = parser.parse(text);
    json.items.item.forEach((element) => {
        console.log(element.name);
    });
});
main();
