import { describe, it } from "node:test";
import assert from "node:assert";
import { Compiler } from "../src/compiler.js";

describe("e2e test suite", () => {
  it("should follow correct order of mathematical operations", () => {
    const compiler = new Compiler();
    assert.strictEqual(compiler.compile("1 + 2"), 3);
    assert.strictEqual(compiler.compile("2 + 3 - 1"), 4);
    assert.strictEqual(compiler.compile("4 * 5 / 2"), 10);
    assert.strictEqual(compiler.compile("2 + 3 * 4"), 14);
  });
  it("should handle precedence with brackets", () => {
    const compiler = new Compiler({});
    assert.strictEqual(compiler.compile("2 * (3 + 4)"), 14);
    assert.strictEqual(compiler.compile("2 * 3 + 4"), 10);
    assert.strictEqual(compiler.compile("2 * (3 + (4 - 1))"), 12);
  });
  it("should create new variable and reference it", () => {
    const compiler = new Compiler({});
    assert.strictEqual(compiler.compile("let a = 5"), 5);
    assert.strictEqual(compiler.compile("a"), 5);
  });
  it("should perform calculations with variables", () => {
    const compiler = new Compiler({});
    assert.strictEqual(compiler.compile("let a = 25"), 25);
    assert.strictEqual(compiler.compile("let b = 10"), 10);
    assert.strictEqual(compiler.compile("a + b"), 35);
  });
});
