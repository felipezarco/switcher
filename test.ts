import switcher from "./mod.ts";
import {
  assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts";

Deno.test("switcher: object style - returns correct value", () => {
  const animal = "cat";
  const binomialName = switcher(animal, {
    "cat": "Felis catus",
    "lion": "Panthera leo",
    "dog": "Canis familiaris",
  });
  assertEquals(binomialName, "Felis catus");
});

Deno.test("switcher: object style - returns correct value for another key", () => {
  const animal = "lion";
  const binomialName = switcher(animal, {
    "cat": "Felis catus",
    "lion": "Panthera leo",
    "dog": "Canis familiaris",
  });
  assertEquals(binomialName, "Panthera leo");
});

Deno.test("switcher: object style - returns undefined if not found and no default", () => {
  const animal = "platypus";
  const binomialName = switcher(animal, {
    "cat": "Felis catus",
    "lion": "Panthera leo",
    "dog": "Canis familiaris",
  });
  assertEquals(binomialName, undefined);
});

Deno.test("switcher: object style - returns default if not found", () => {
  const animal = "platypus";
  const binomialName = switcher(animal, {
    "cat": "Felis catus",
    "lion": "Panthera leo",
    "dog": "Canis familiaris",
  }, { default: "Uncataloged species" });
  assertEquals(binomialName, "Uncataloged species");
});

Deno.test("switcher: array of case functions - returns correct value", () => {
  const animal = "wildcat";
  const binomialName = switcher(animal, [
    {
      case: (str: string) => str.includes("cat"),
      value: "Felis catus",
    },
    {
      case: (str: string) => str.includes("lion"),
      value: "Panthera leo",
    },
    {
      case: (str: string) => str.includes("dog"),
      value: "Canis familiaris",
    },
  ], { default: "Uncataloged species" });
  assertEquals(binomialName, "Felis catus");
});

Deno.test("switcher: array of case functions - returns default if no match", () => {
  const animal = "platypus";
  const binomialName = switcher(animal, [
    {
      case: (str: string) => str.includes("cat"),
      value: "Felis catus",
    },
    {
      case: (str: string) => str.includes("lion"),
      value: "Panthera leo",
    },
    {
      case: (str: string) => str.includes("dog"),
      value: "Canis familiaris",
    },
  ], { default: "Uncataloged species" });
  assertEquals(binomialName, "Uncataloged species");
});

// Regex case test

Deno.test("switcher: array of case functions - regex match", () => {
  const animal = "wildcat";
  const binomialName = switcher(animal, [
    {
      case: (str: string) => /cat/.test(str),
      value: "Felis catus",
    },
    {
      case: (str: string) => /lion/.test(str),
      value: "Panthera leo",
    },
    {
      case: (str: string) => /dog/.test(str),
      value: "Canis familiaris",
    },
  ], { default: "Uncataloged species" });
  assertEquals(binomialName, "Felis catus");
});


Deno.test("switcher: array of case functions - other evaluation", () => {
  const animal = "wildcat";
  const binomialName = switcher(animal, [
    {
      case: (str: string) => str.startsWith("wild"),
      value: "Felis silvestris",
    },
    {
      case: (str: string) => str.includes("cat"),
      value: "Felis catus",
    },
    {
      case: (str: string) => str.includes("dog"),
      value: "Canis familiaris",
    },
  ], { default: "Uncataloged species" });
  assertEquals(binomialName, "Felis silvestris");
});

Deno.test("switcher: array of case functions - default case", () => {
  const animal = "platypus";
  const binomialName = switcher(animal, [
    {
      case: (str: string) => str.includes("cat"),
      value: "Felis catus",
    },
    {
      case: (str: string) => str.includes("lion"),
      value: "Panthera leo",
    },
    {
      case: (str: string) => str.includes("dog"),
      value: "Canis familiaris",
    },
  ], { default: "Uncataloged species" });
  assertEquals(binomialName, "Uncataloged species");
});

Deno.test("switcher: case sensitive - returns correct value", () => {
  const animal = "Cat";
  const binomialName = switcher(animal, {
    "cat": "Felis catus",
    "lion": "Panthera leo",
    "dog": "Canis familiaris",
  });
  assertEquals(binomialName, undefined); // Case sensitive, so no match
});