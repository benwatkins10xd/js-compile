import { LET_KEYWORD_VALUE } from "./constants/keyword-values.js";
import {
  NUMBER_TOKEN_TYPE,
  PLUS_TOKEN_TYPE,
  MINUS_TOKEN_TYPE,
  TIMES_TOKEN_TYPE,
  DIVIDE_TOKEN_TYPE,
  WHITESPACE_TOKEN_TYPE,
  OPEN_BRACKET_TOKEN_TYPE,
  CLOSE_BRACKET_TOKEN_TYPE,
  UNQUOTED_STRING_TYPE,
  ASSIGNMENT_OPERATOR_TYPE,
  LET_KEYWORD_TYPE,
  EOF_TOKEN_TYPE,
} from "./constants/token-types.js";
import { LexerError } from "./structs/errors.js";
import { Token } from "./structs/token.js";

export class Lexer {
  constructor(inputText) {
    this.inputText = inputText;
    this.tokens = [];
    this.tokenTypes = [
      // TODO: lexer crashes when putting decimal. could fix regex?
      { type: NUMBER_TOKEN_TYPE, regex: /^\d+/ },
      { type: PLUS_TOKEN_TYPE, regex: /^\+/ },
      { type: MINUS_TOKEN_TYPE, regex: /^\-/ },
      { type: TIMES_TOKEN_TYPE, regex: /^\*/ },
      { type: DIVIDE_TOKEN_TYPE, regex: /^\// },
      { type: WHITESPACE_TOKEN_TYPE, regex: /^\s+/ },
      { type: OPEN_BRACKET_TOKEN_TYPE, regex: /^\(/ },
      { type: CLOSE_BRACKET_TOKEN_TYPE, regex: /^\)/ },
      { type: UNQUOTED_STRING_TYPE, regex: /^[a-zA-Z]+/ },
      { type: ASSIGNMENT_OPERATOR_TYPE, regex: /^=/ },
    ];
  }

  tokenize() {
    let currentIndex = 0;
    while (currentIndex < this.inputText.length) {
      let matchedToken = null;

      for (const tokenType of this.tokenTypes) {
        const regexResult = this.inputText
          .slice(currentIndex)
          .match(tokenType.regex);

        if (regexResult && regexResult.index === 0) {
          const value = regexResult[0];
          const type = tokenType.type;
          // handle 'let' keyword
          if (type === UNQUOTED_STRING_TYPE && value === LET_KEYWORD_VALUE) {
            this.tokens.push(new Token(LET_KEYWORD_TYPE, value));
          } else {
            this.tokens.push(new Token(type, value));
          }
          currentIndex += value.length;
          matchedToken = type;
          break;
        }
      }

      if (!matchedToken) {
        throw new LexerError(
          `Lexer error: unrecognised token: ${this.inputText.slice(
            currentIndex
          )}`
        );
      }
    }
    this.tokens.push(new Token(EOF_TOKEN_TYPE, "\0"));
    for (let tokenIndex = 0; tokenIndex < this.tokens.length; tokenIndex++) {
      if (this.tokens[tokenIndex].tokenType === WHITESPACE_TOKEN_TYPE) {
        this.tokens.splice(tokenIndex, 1);
      }
    }
    return this.tokens;
  }
}
