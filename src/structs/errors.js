export class CompilerError extends Error {
  constructor(message) {
    super(message);
    this.name = "CompilerError";
  }
}

export class LexerError extends CompilerError {
  constructor(message) {
    super(message);
    this.name = "LexerError";
  }
  toString() {
    return this.message; // hide the js call stack
  }
}

export class ParserError extends CompilerError {
  constructor(message) {
    super(message);
    this.name = "ParserError";
  }
  toString() {
    return this.message;
  }
}

export class EvaluatorError extends CompilerError {
  constructor(message) {
    super(message);
    this.name = "EvaluatorError";
  }
  toString() {
    return this.message;
  }
}
