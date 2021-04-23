import * as parser from 'fast-xml-parser';
import { Item, ItemPool } from "./Isaac";

export class XmlParser {
    static loadPools(xml: string) {
        let json = <any>parser.parse(xml, { arrayMode: true, ignoreAttributes: false });
        return <ItemPool[]>json.ItemPools[0].Pool.map((e: any) => ({
            name: e["@_Name"],
            items: e.Item.map((i: any) => ({
                id: Number(i["@_Id"]),
                weight: Number(i["@_Weight"])
            }))
        }));
    }
    static loadMeta(xml: string) {
        let json = <any>parser.parse(xml, { arrayMode: true, ignoreAttributes: false });
        let qualities = json.items[0].item.map((e: any) => ({
            id: Number(e["@_id"]),
            quality: Number(e["@_quality"])
        }));
        return qualities.reduce((h: any, i: any) => (h.set(i.id, i.quality), h), new Map<Number, Item>());
    }
    // static loadItems(xml: string) {
    //     let json = <any>convert.xml2json(xml, { compact: false, ignoreCdata: true, ignoreComment: true, ignoreDeclaration: true, ignoreDoctype: true, ignoreInstruction: true, alwaysArray: true });
    //     let items = <Item[]>json.elements[0].elements
    //         .map((e: any) => ({ type: e.name, name: e.attributes.name, id: Number(e.attributes.id) }));
    //     items = items.filter(i => i.type == "active" || i.type == "passive" || i.type == "familiar");
    //     return items.reduce((h, i) => (h.set(i.id, i), h), new Map<number, Item>());
    // }
}