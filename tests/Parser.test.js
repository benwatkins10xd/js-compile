import { describe, it } from "node:test";
import assert from "node:assert";
import { Parser } from "../src/parser.js";
import { BinaryExpression } from "../src/structs/expression-types.js";
import { Token } from "../src/structs/token.js";

describe("parser test suite", () => {
  it("should parse single number", () => {
    const tokens = [
      new Token("number", "1"),
      new Token("endOfFileToken", "\x00"),
    ];
    const expectedAst = new Token("number", "1");
    const parser = new Parser(tokens);
    const ast = parser.parse();
    assert.deepStrictEqual(ast, expectedAst);
  });

  it("should parse a simple addition expression", () => {
    const tokens = [
      new Token("number", "1"),
      new Token("plusToken", "+"),
      new Token("number", "2"),
      new Token("endOfFileToken", "\0"),
    ];
    const parser = new Parser(tokens);
    const ast = parser.parse();

    assert.ok(ast instanceof BinaryExpression);
    assert.deepStrictEqual(ast.leftToken, new Token("number", "1"));
    assert.deepStrictEqual(ast.operatorToken, new Token("plusToken", "+"));
    assert.deepStrictEqual(ast.rightToken, new Token("number", "2"));
  });
});
