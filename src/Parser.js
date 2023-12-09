const { BinaryExpression } = require("./expressionTypes");
const { ParserError } = require("./Errors");
class Parser {
  #tokens;
  #position;
  constructor(tokens) {
    this.#tokens = tokens;
    this.#position = 0;
  }

  #currentToken() {
    return this.#peek(0);
  }

  // lets us look ahead of the current token
  // or gives us the current token if offset = 0
  #peek(offset) {
    let index = this.#position + offset;
    if (index >= this.#tokens.length) {
      return this.#tokens[this.#tokens.length - 1];
    }
    return this.#tokens[index];
  }

  #match(type) {
    if (this.#currentToken().tokenType === type) {
      return this.#nextToken();
    }
    throw new ParserError(
      `Parser error: bad token type: ${
        this.#currentToken().tokenType
      }, expected: ${type}`
    );
  }

  #nextToken() {
    let current = this.#currentToken();
    this.#position++;
    return current;
  }

  #parseBinaryExpression() {
    return this.#match("number");
  }

  /* BIDMAS:
    B - brackets
    I - indices (powers)
    D - division
    M - multiplication
    A - addition
    S - subtraction
    */
  #getBinaryOperatorPriority(tokenType) {
    switch (tokenType) {
      case "timesToken":
      case "divideToken":
        return 2;
      case "plusToken":
      case "minusToken":
        return 1;
      default:
        return 0;
    }
  }

  #parseExpression(parentPriority = 0) {
    let leftToken = this.#parseBinaryExpression();

    while (true) {
      let priority = this.#getBinaryOperatorPriority(
        this.#currentToken().tokenType
      );
      if (priority === 0 || priority <= parentPriority) {
        break;
      }
      let operatorToken = this.#nextToken();
      let rightToken = this.#parseExpression(priority);
      leftToken = new BinaryExpression(leftToken, operatorToken, rightToken);
    }
    return leftToken;
  }

  parse() {
    let ast = this.#parseExpression();
    return ast;
  }
}

exports.Parser = Parser;
