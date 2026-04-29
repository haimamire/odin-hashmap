export function LinkedList() {
  let listHead = null;
  let listTail = null;

  function newNode(val) {
    const value = val;
    let nextNode = null;

    return {
      value,
      nextNode,
    };
  }

  function append(value) {
    const node = newNode(value);

    if (listTail !== null) listTail.nextNode = node;
    if (listHead === null) listHead = node;
    listTail = node;
  }

  function prepend(value) {
    const node = newNode(value);

    if (listHead !== null) node.nextNode = listHead;
    if (listTail === null) listTail = node;
    listHead = node;
  }

  function size() {
    return _size(listHead);
  }

  function _size(currentNode) {
    if (currentNode === null) return 0;

    return 1 + _size(currentNode.nextNode);
  }

  function head() {
    if (listHead === null) return;
    return listHead.value;
  }

  function tail() {
    if (listTail === null) return;
    return listTail.value;
  }

  function at(index) {
    const node = _getNodeMatchingIndex(listHead, 0, index);

    return node === undefined ? node : node.value;
  }

  function _getNodeMatchingIndex(currentNode, currentIndex, targetIndex) {
    if (currentIndex > targetIndex || currentNode === null) return;
    if (currentIndex === targetIndex) return currentNode;

    return _getNodeMatchingIndex(
      currentNode.nextNode,
      currentIndex + 1,
      targetIndex,
    );
  }

  function pop() {
    if (listHead === null) return undefined;

    const currentNode = listHead;
    listHead = currentNode.nextNode;

    return currentNode.value;
  }

  function contains(value) {
    return _getNodeMatchingValue(value, listHead) === undefined ? false : true;
  }

  function _getNodeMatchingValue(value, currentNode) {
    if (currentNode.value === value) return currentNode;
    if (currentNode.nextNode === null) return;

    return _getNodeMatchingValue(value, currentNode.nextNode);
  }

  function findIndex(value) {
    return _getIndexFromValue(value, listHead);
  }

  function _getIndexFromValue(value, currentNode, currentIndex = 0) {
    if (value === currentNode.value) return currentIndex;
    if (currentNode.nextNode === null) return -1;

    return _getIndexFromValue(value, currentNode.nextNode, currentIndex + 1);
  }

  function toString() {
    return _toString(listHead);
  }

  function _toString(currentNode) {
    if (currentNode === null) return currentNode;
    return `( ${currentNode.value} ) -> ${_toString(currentNode.nextNode)}`;
  }

  function insertAt(index, ...values) {
    if (index < 0 || (index > size() && index !== 0)) throw new RangeError();

    let prevNode = _getNodeMatchingIndex(listHead, 0, index - 1);
    const nodeAfterInsert =
      prevNode === undefined ? listHead : prevNode.nextNode;

    for (let [index, value] of values.entries()) {
      const currentNode = newNode(value);

      if (prevNode === undefined) {
        listHead = currentNode;
        prevNode = currentNode;
        continue;
      }
      if (index === values.length - 1 && nodeAfterInsert === null)
        listTail = currentNode;

      prevNode.nextNode = currentNode;
      prevNode = currentNode;
    }

    prevNode.nextNode = nodeAfterInsert;
  }

  function removeAt(index) {
    if (index < 0 || index >= size()) throw new RangeError();

    const prevNode = _getNodeMatchingIndex(listHead, 0, index - 1) ?? null;
    const nextNode = _getNodeMatchingIndex(listHead, 0, index + 1) ?? null;

    if (prevNode === null) listHead = nextNode;
    else prevNode.nextNode = nextNode;

    if (nextNode === null) listTail = prevNode;
  }

  function reset() {
    listHead = null;
    listTail = null;
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    findIndex,
    toString,
    insertAt,
    removeAt,
    reset,
  };
}
