import { LinkedList } from "./linkedList.js";

export function HashMap() {
  let capacity = 16;
  const loadFactor = 0.75;

  const buckets = [];

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

    return matchingKey.value ?? null;
  }

  function has(key) {
    const hashCode = hash(key);
    if (buckets[hashCode] === undefined) return false;
    const bucket = buckets[hashCode];

    return typeof _getMatchingKey(key, bucket) === "object" ? true : false;
  }

  return {
    set,
    get,
    has,
    buckets,
  };
}

const hashMap = HashMap();

hashMap.set("Rama", "Matusevich");
hashMap.set("Rama", "Matuseaasdasdvich");
hashMap.set("Sita", "Hernandez");
// console.log(hashMap.buckets[3].at(0));
// console.log(hashMap.buckets[3].at(1));
