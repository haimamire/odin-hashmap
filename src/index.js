function newHashMap() {
  const capacity = 16;
  const loadFactor = 0.75;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  return {
    hash,
  };
}

const hashMap = newHashMap();

console.log(hashMap.hash("abcdefghi"));
