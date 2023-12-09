const { describe, it } = require("node:test");
const assert = require("node:assert");
const { Parser } = require("../src/Parser");
const { BinaryExpression } = require("../src/expressionTypes");

describe("parser test suite", () => {
  it("should parse single number", () => {
    const tokens = [
      { tokenType: "number", tokenValue: "1" },
      { tokenType: "endOfFileToken", tokenValue: "\x00" },
    ];
    const expectedAst = {
      tokenType: "number",
      tokenValue: "1",
    };
    const parser = new Parser(tokens);
    const ast = parser.parse();
    assert.deepStrictEqual(ast, expectedAst);
  });

  it("should parse a simple addition expression", () => {
    const tokens = [
      { tokenType: "number", tokenValue: "1" },
      { tokenType: "plusToken", tokenValue: "+" },
      { tokenType: "number", tokenValue: "2" },
      { tokenType: "endOfFileToken", tokenValue: "\0" },
    ];
    const parser = new Parser(tokens);
    const ast = parser.parse();

    assert.ok(ast instanceof BinaryExpression);
    assert.deepStrictEqual(ast.leftToken, {
      tokenType: "number",
      tokenValue: "1",
    });
    assert.deepStrictEqual(ast.operatorToken, {
      tokenType: "plusToken",
      tokenValue: "+",
    });
    assert.deepStrictEqual(ast.rightToken, {
      tokenType: "number",
      tokenValue: "2",
    });
  });
});
