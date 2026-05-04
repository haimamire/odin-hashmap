import { HashMap } from "../src";

describe("hashMap", () => {
  const hashMap = HashMap();

  beforeEach(() => {
    hashMap.clear();
    hashMap.set("Rama", "Matusevich");
    hashMap.set("Sita", "Hernandez");
    hashMap.set("Rodrigo", "Coso");
  });

  test("should reject keys that are not strings", () => {
    expect(() => hashMap.set()).toThrow();
    expect(() => hashMap.set(1)).toThrow();
    expect(() => hashMap.set(null)).toThrow();
    expect(() => hashMap.set(undefined)).toThrow();
    expect(() => hashMap.set(NaN)).toThrow();
    expect(() => hashMap.set(Object)).toThrow();
  });
  test("should find the keys and return their values", () => {
    expect(hashMap.get("Rama")).toBe("Matusevich");
    expect(hashMap.get("Sita")).toBe("Hernandez");
  });
  test("should return null if the key does not exist", () => {
    expect(hashMap.get("a")).toBeNull();
    expect(hashMap.get("")).toBeNull();
  });
  test("should find out whether a key exists or not", () => {
    expect(hashMap.has("Rama")).toBeTruthy();
    expect(hashMap.has("Sita")).toBeTruthy();
    expect(hashMap.has("a")).toBeFalsy();
  });
  test("should remove a value", () => {
    expect(hashMap.remove("Rama")).toBeTruthy();
    expect(hashMap.get("Rama")).toBeNull();
    expect(hashMap.has("Rama")).toBeFalsy();

    expect(hashMap.remove("")).toBeFalsy();
  });
  test("should return the length of the hash map", () => {
    expect(hashMap.length()).toBe(3);
  });
  test("should clear the hash map", () => {
    hashMap.clear();
    expect(hashMap.length()).toBe(0);
    expect(hashMap.get("Rama")).toBeNull();
    expect(hashMap.has("Rama")).toBeFalsy();
  });
  test("should return the keys", () => {
    expect(hashMap.keys().sort()).toEqual(["Rodrigo", "Rama", "Sita"].sort());

    hashMap.set("Mario", "Sandoval");
    expect(hashMap.keys().sort()).toEqual(
      ["Rodrigo", "Rama", "Sita", "Mario"].sort(),
    );

    hashMap.clear();
    expect(hashMap.keys()).toEqual([]);
  });
  test("should return the values", () => {
    expect(hashMap.values().sort()).toEqual(
      ["Matusevich", "Hernandez", "Coso"].sort(),
    );

    hashMap.set("Mario", "Sandoval");
    expect(hashMap.values().sort()).toEqual(
      ["Matusevich", "Hernandez", "Coso", "Sandoval"].sort(),
    );

    hashMap.clear();
    expect(hashMap.values()).toEqual([]);
  });
  test("should return the entries", () => {
    expect(hashMap.entries().sort()).toEqual(
      [
        ["Rama", "Matusevich"],
        ["Sita", "Hernandez"],
        ["Rodrigo", "Coso"],
      ].sort(),
    );

    hashMap.set("Mario", "Sandoval");
    expect(hashMap.entries().sort()).toEqual(
      [
        ["Rama", "Matusevich"],
        ["Sita", "Hernandez"],
        ["Rodrigo", "Coso"],
        ["Mario", "Sandoval"],
      ].sort(),
    );

    hashMap.clear();
    expect(hashMap.entries()).toEqual([]);
  });
  test("should work fine even after exceeding its load factor", () => {
    hashMap.set("apple", "red");
    hashMap.set("banana", "yellow");
    hashMap.set("carrot", "orange");
    hashMap.set("dog", "brown");
    hashMap.set("elephant", "gray");
    hashMap.set("frog", "green");
    hashMap.set("grape", "purple");
    hashMap.set("hat", "black");
    hashMap.set("ice cream", "white");
    hashMap.set("jacket", "blue");
    hashMap.set("kite", "pink");
    hashMap.set("lion", "golden");

    expect(hashMap.length()).toBe(15);
    expect(hashMap.has("Rodrigo")).toBeTruthy();
    expect(hashMap.get("Rama")).toBe("Matusevich");
    expect(hashMap.has("grape")).toBeTruthy();
    expect(hashMap.remove("")).toBeFalsy();
    expect(hashMap.has("Grape")).toBeFalsy();

    expect(hashMap.entries().sort()).toEqual(
      [
        ["Rama", "Matusevich"],
        ["Sita", "Hernandez"],
        ["Rodrigo", "Coso"],
        ["apple", "red"],
        ["banana", "yellow"],
        ["carrot", "orange"],
        ["dog", "brown"],
        ["elephant", "gray"],
        ["frog", "green"],
        ["grape", "purple"],
        ["hat", "black"],
        ["ice cream", "white"],
        ["jacket", "blue"],
        ["kite", "pink"],
        ["lion", "golden"],
      ].sort(),
    );

    hashMap.remove("frog");
    expect(hashMap.has("frog")).toBeFalsy();

    hashMap.set("Rama", "asdfasfasdfasdfasfsd");
    expect(hashMap.get("Rama")).toBe("asdfasfasdfasdfasfsd");
  });
});
