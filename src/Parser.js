import {
  BinaryExpression,
  VariableAssignment,
  ParenthesisedExpression,
  VariableAccess,
  BooleanExpression,
} from "./structs/expression-types.js";
import { ParserError } from "./structs/errors.js";
import {
  OPEN_BRACKET_TOKEN_TYPE,
  CLOSE_BRACKET_TOKEN_TYPE,
  UNQUOTED_STRING_TYPE,
  NUMBER_TOKEN_TYPE,
  MINUS_TOKEN_TYPE,
  PLUS_TOKEN_TYPE,
  DIVIDE_TOKEN_TYPE,
  TIMES_TOKEN_TYPE,
  ASSIGNMENT_OPERATOR_TYPE,
  LET_KEYWORD_TYPE,
  POWER_TOKEN_TYPE,
  MODULO_TOKEN_TYPE,
  TRUE_KEYWORD_TYPE,
  FALSE_KEYWORD_TYPE,
} from "./constants/token-types.js";

export class Parser {
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
      case OPEN_BRACKET_TOKEN_TYPE:
        let leftToken = this.#nextToken();
        let operatorToken = this.#parseVariableAssignment();
        let rightToken = this.#match(CLOSE_BRACKET_TOKEN_TYPE);
        return new ParenthesisedExpression(
          leftToken,
          operatorToken,
          rightToken
        );
      case UNQUOTED_STRING_TYPE:
        const identifierToken = this.#nextToken();
        return new VariableAccess(identifierToken.tokenValue);
      default:
        return this.#match(NUMBER_TOKEN_TYPE);
    }
  }

  #getBinaryOperatorPriority(tokenType) {
    switch (tokenType) {
      case POWER_TOKEN_TYPE:
        return 3;
      case TIMES_TOKEN_TYPE:
      case DIVIDE_TOKEN_TYPE:
      case MODULO_TOKEN_TYPE:
        return 2;
      case PLUS_TOKEN_TYPE:
      case MINUS_TOKEN_TYPE:
        return 1;
      default:
        return 0;
    }
  }

  #parseVariableAssignment() {
    if (
      this.#currentToken().tokenType === UNQUOTED_STRING_TYPE &&
      this.#peek(1).tokenType === ASSIGNMENT_OPERATOR_TYPE
    ) {
      const variableName = this.#nextToken();
      const identifierToken = this.#nextToken();
      const right = this.#parseVariableAssignment();
      return new VariableAssignment(variableName, identifierToken, right);
    } else if (
      this.#currentToken().tokenType === NUMBER_TOKEN_TYPE &&
      this.#peek(1).tokenType === ASSIGNMENT_OPERATOR_TYPE
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
    if (this.#currentToken().tokenType === LET_KEYWORD_TYPE) {
      this.#nextToken(); // consume the 'let' token.
      ast = this.#parseVariableAssignment();
    } else if (
      this.#currentToken().tokenType === TRUE_KEYWORD_TYPE ||
      this.#currentToken().tokenType === FALSE_KEYWORD_TYPE
    ) {
      ast = new BooleanExpression(this.#nextToken());
    } else {
      return this.#parseBinaryExpression();
    }

    return ast;
  }
}
