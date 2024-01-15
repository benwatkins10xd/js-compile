const { describe, it } = require("node:test");
const assert = require("node:assert");
const { Lexer } = require("../src/Lexer");
const { LexerError } = require("../src/Errors");
const { Token } = require("../src/Token");

describe("lexer test suite", () => {
  it("should tokenize single number", () => {
    const nums = "1";
    const expectedTokens = [
      new Token("number", "1"),
      new Token("endOfFileToken", "\x00"),
    ];
    const lexer = new Lexer(nums);
    const tokens = lexer.tokenize();
    assert.deepStrictEqual(tokens, expectedTokens);
  });

  it("should tokenize multiple numbers", () => {
    const nums = "123 456 7890";
    const expectedTokens = [
      new Token("number", "123"),
      new Token("number", "456"),
      new Token("number", "7890"),
      new Token("endOfFileToken", "\x00"),
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
      new Token("plusToken", "+"),
      new Token("minusToken", "-"),
      new Token("timesToken", "*"),
      new Token("divideToken", "/"),
      new Token("endOfFileToken", "\x00"),
    ];
    const lexer = new Lexer(operators);
    const tokens = lexer.tokenize();
    assert.deepStrictEqual(tokens, expectedTokens);
  });
});
