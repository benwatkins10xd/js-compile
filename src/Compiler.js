const { Lexer } = require("./Lexer");
const { Parser } = require("./Parser");
const { Evaluator } = require("./Evaluator");

class Compiler {
  constructor() {
    this.ast;
    this.tokens;
  }

  compile(input) {
    // First, tokenize input
    let lexer = new Lexer(input);
    this.tokens = lexer.tokenize();

    // Next, create AST
    let parser = new Parser(this.tokens);
    this.ast = parser.parse();

    // Finally, evaluate result
    let evaluator = new Evaluator();
    return evaluator.evaluate(this.ast);
  }
}
exports.Compiler = Compiler;
