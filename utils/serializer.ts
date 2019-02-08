const {gzip, ungzip} = require("pako");

export class Serializer {
  static serialize(data: any) {
    return gzip(JSON.stringify(data), {to: 'string'});
  }

  static deserialize(bytes: any) {
    const str = ungzip(bytes, { to: 'string' });
    return  JSON.parse(str);
  }
}
