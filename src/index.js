import { LinkedList } from "./linkedList.js";

export function HashMap() {
  let capacity = 16;
  const loadFactor = 0.75;

  let buckets = [];

  function hash(key) {
    if (typeof key !== "string") throw Error("Keys must only be strings!");

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key, value) {
    const hashCode = hash(key);
    if (buckets[hashCode] === undefined) _newBucket(hashCode);

    const bucket = buckets[hashCode];
    let matchingKey = _getMatchingKey(key, bucket);

    if (matchingKey === null) bucket.append({ key, value });
    else matchingKey.value = value;
  }

  function _newBucket(index) {
    if (index < 0 || index >= capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    const list = LinkedList();
    buckets[index] = list;
  }

  function _getMatchingKey(key, bucket) {
    for (let i = 0; i < bucket.size(); i++) {
      const currentElem = bucket.at(i);
      if (currentElem.key === key) return currentElem;
    }
    return null;
  }

  function get(key) {
    const hashCode = hash(key);
    if (buckets[hashCode] === undefined) return null;

    const bucket = buckets[hashCode];
    const matchingKey = _getMatchingKey(key, bucket);

    if (matchingKey === null) return matchingKey;
    else return matchingKey.value;
  }

  function has(key) {
    const hashCode = hash(key);
    if (buckets[hashCode] === undefined) return false;
    const bucket = buckets[hashCode];

    if (_getMatchingKey(key, bucket) === null) return false;
    else return true;
  }

  function remove(key) {
    const hashCode = hash(key);
    if (buckets[hashCode] === undefined) return false;
    const bucket = buckets[hashCode];

    if (has(key)) {
      for (let i = 0; i < bucket.size(); i++) {
        const currentElem = bucket.at(i);
        if (currentElem.key === key) {
          bucket.removeAt(i);
          return true;
        }
      }
    } else return false;
  }

  function length() {
    let length = 0;
    for (let bucket of buckets) {
      if (bucket === undefined) continue;
      length += bucket.size();
    }
    return length;
  }

  function clear() {
    buckets.length = 0;
  }

  function keys() {
    const keys = [];
    for (let bucket of buckets) {
      if (bucket === undefined) continue;
      for (let i = 0; i < bucket.size(); i++) {
        const key = bucket.at(i).key;
        keys.push(key);
      }
    }
    return keys;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    buckets,
  };
}

const hashMap = HashMap();

hashMap.set("Rama", "Matusevich");
hashMap.set("Rama", "Matuseaasdasdvich");
hashMap.set("Sita", "Hernandez");
hashMap.remove("Rama");
console.log(hashMap.buckets[3].at(0));
console.log(hashMap.buckets[3].at(1));
