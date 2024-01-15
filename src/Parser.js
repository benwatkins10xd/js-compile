const {
  BinaryExpression,
  VariableAssignment,
  ParenthesisedExpression,
  VariableAccess,
} = require("./expressionTypes");
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

  #parseBinaryExpression(parentPriority = 0) {
    let leftToken = this.#parsePrimaryExpression();

    while (true) {
      let priority = this.#getBinaryOperatorPriority(
        this.#currentToken().tokenType
      );
      if (priority === 0 || priority <= parentPriority) {
        break;
      }
      let operatorToken = this.#nextToken();
      let rightToken = this.#parseBinaryExpression(priority);
      leftToken = new BinaryExpression(leftToken, operatorToken, rightToken);
    }
    return leftToken;
  }

  #parsePrimaryExpression() {
    const firstToken = this.#currentToken();
    switch (firstToken.tokenType) {
      case "openBracketToken":
        let leftToken = this.#nextToken();
        let operatorToken = this.#parseVariableAssignment();
        let rightToken = this.#match("closeBracketToken");
        return new ParenthesisedExpression(
          leftToken,
          operatorToken,
          rightToken
        );
      case "unquotedString":
        const identifierToken = this.#nextToken();
        return new VariableAccess(identifierToken.tokenValue);
      default:
        return this.#match("number");
    }
  }

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

  #parseVariableAssignment() {
    if (
      this.#currentToken().tokenType === "unquotedString" &&
      this.#peek(1).tokenType === "assignmentOperator"
    ) {
      const variableName = this.#nextToken();
      const identifierToken = this.#nextToken();
      const right = this.#parseVariableAssignment();
      return new VariableAssignment(variableName, identifierToken, right);
    } else if (
      this.#currentToken().tokenType === "number" &&
      this.#peek(1).tokenType === "assignmentOperator"
    ) {
      throw new ParserError(
        `Parser error: variable names must be strings, got {${
          this.#currentToken().tokenValue
        }}`
      );
    } else {
      return this.#parseBinaryExpression();
    }
  }

  parse() {
    let ast;
    if (this.#currentToken().tokenType === "letKeyword") {
      this.#nextToken(); // consume the 'let' token.
      ast = this.#parseVariableAssignment();
    } else {
      return this.#parseBinaryExpression();
    }

    return ast;
  }
}

exports.Parser = Parser;
