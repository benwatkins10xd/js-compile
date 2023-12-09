class CompilerError extends Error {
  constructor(message) {
    super(message);
    this.name = "CompilerError";
  }
}

class LexerError extends CompilerError {
  constructor(message) {
    super(message);
    this.name = "LexerError";
  }
  toString() {
    return this.message; // hide the js call stack
  }
}

class ParserError extends CompilerError {
  constructor(message) {
    super(message);
    this.name = "ParserError";
  }
  toString() {
    return this.message;
  }
}

class EvaluatorError extends CompilerError {
  constructor(message) {
    super(message);
    this.name = "EvaluatorError";
  }
  toString() {
    return this.message;
  }
}

exports.CompilerError = CompilerError;
exports.EvaluatorError = EvaluatorError;
exports.LexerError = LexerError;
exports.ParserError = ParserError;
