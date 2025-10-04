import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";
import { Evaluator } from "./evaluator.js";

export class Compiler {
  constructor(variables) {
    this.ast;
    this.tokens;
    this.variables = variables;
  }

  compile(input) {
    // First, tokenize input
    let lexer = new Lexer(input);
    this.tokens = lexer.tokenize();

    // Next, create AST
    let parser = new Parser(this.tokens);
    this.ast = parser.parse();

    // Finally, evaluate result
    let evaluator = new Evaluator(this.variables);
    return evaluator.evaluate(this.ast);
  }
}
