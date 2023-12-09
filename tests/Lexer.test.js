const { describe, it } = require("node:test");
const assert = require("node:assert");
const { Lexer } = require("../src/Lexer");
const { LexerError } = require("../src/Errors");

describe("lexer test suite", () => {
  it("should tokenize single number", () => {
    const nums = "1";
    const expectedTokens = [
      { tokenType: "number", tokenValue: "1" },
      { tokenType: "endOfFileToken", tokenValue: "\x00" },
    ];
    const lexer = new Lexer(nums);
    const tokens = lexer.tokenize();
    assert.deepStrictEqual(tokens, expectedTokens);
  });

  it("should tokenize multiple numbers", () => {
    const nums = "123 456 7890";
    const expectedTokens = [
      { tokenType: "number", tokenValue: "123" },
      { tokenType: "number", tokenValue: "456" },
      { tokenType: "number", tokenValue: "7890" },
      { tokenType: "endOfFileToken", tokenValue: "\x00" },
    ];
    const lexer = new Lexer(nums);
    const tokens = lexer.tokenize();
    assert.deepStrictEqual(tokens, expectedTokens);
  });

  it("should not parse floats", () => {
    const nums = "1.2";
    const lexer = new Lexer(nums);
    assert.throws(() => lexer.tokenize(), LexerError);
  });

  it("should tokenize operators", () => {
    const operators = "+ - * /";
    const expectedTokens = [
      { tokenType: "plusToken", tokenValue: "+" },
      { tokenType: "minusToken", tokenValue: "-" },
      { tokenType: "timesToken", tokenValue: "*" },
      { tokenType: "divideToken", tokenValue: "/" },
      { tokenType: "endOfFileToken", tokenValue: "\x00" },
    ];
    const lexer = new Lexer(operators);
    const tokens = lexer.tokenize();
    assert.deepStrictEqual(tokens, expectedTokens);
  });
});
