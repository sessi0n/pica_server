
export class Convert {
  static strToJsonObjMap(obj: any) {
    let strMap = new Map();
    if (obj == null)
      return strMap;
    for (let k of Object.keys(obj)) {
      strMap.set(k, JSON.parse(obj[k]));
    }
    //내용을 확인하려면 forEach로 돌면서 확인해야함
    // strMap.forEach((value, key, map) => {
    //   logger.error('%s, %s', value, key);
    // });
    return strMap;
  }

  static objToStrMap(obj: any) {
    let strMap = new Map();
    if (obj == null)
      return strMap;
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    //내용을 확인하려면 forEach로 돌면서 확인해야함
    // strMap.forEach((value, key, map) => {
    //   logger.error('%s, %s', value, key);
    // });
    return strMap;
  }

  static strMapToObj(strMap: any) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  static objToNumMap(obj: any): Map<number, number> {
    let map = new Map<number, number>();
    if (obj == null)
      return map;
    for (let k of Object.keys(obj)) {
      map.set(parseInt(k), parseInt(obj[k]));
    }
    return map;
  }

  static objToArray(obj: any){
    if(obj == null)
      return [];
    return Object.keys(obj).map(function (data) {
      return obj[data];
    });
  }

  static getEnumValue(type: any, key: string) {
    if (key)
      key = key.toUpperCase();
    return type[key];
  };

  static getEnumKey(type: any, value: number): any {
    return Object.keys(type).find(key => type[key] === value);
  };
}