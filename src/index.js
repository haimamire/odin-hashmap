import { LinkedList } from "./linkedList.js";

function newHashMap() {
  let capacity = 16;
  const loadFactor = 0.75;

  const buckets = [];

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key, value) {
    const hashCode = hash(key);

    if (buckets[hashCode] === undefined) newBucket(hashCode);

    const bucket = buckets[hashCode];
    let sameKeyFound = false;

    for (let i = 0; i < bucket.size(); i++) {
      const currentElem = bucket.at(i);
      if (currentElem.key === key) {
        currentElem.value = value;
        sameKeyFound = true;
        break;
      }
    }
    if (!sameKeyFound) bucket.append({ key, value });
  }

  function newBucket(index) {
    if (index < 0 || index >= capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    const list = LinkedList();
    buckets[index] = list;
  }

  return {
    set,
    buckets,
  };
}

const hashMap = newHashMap();

hashMap.set("Rama", "Matusevich");
hashMap.set("Rama", "Matuseaasdasdvich");
hashMap.set("Sita", "Hernandez");
console.log(hashMap.buckets[3].at(0));
console.log(hashMap.buckets[3].at(1));
