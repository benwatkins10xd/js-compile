const { describe, it } = require("node:test");
const assert = require("node:assert");
const { Compiler } = require("../src/Compiler");

describe("e2e test suite", () => {
  it("should follow correct order of mathematical operations", () => {
    const compiler = new Compiler();
    assert.strictEqual(compiler.compile("1 + 2"), 3);
    assert.strictEqual(compiler.compile("2 + 3 - 1"), 4);
    assert.strictEqual(compiler.compile("4 * 5 / 2"), 10);
    assert.strictEqual(compiler.compile("2 + 3 * 4"), 14);
  });
});
