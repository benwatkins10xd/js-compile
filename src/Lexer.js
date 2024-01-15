const { LexerError } = require("./Errors");
const { Token } = require("./Token");

class Lexer {
  constructor(inputText) {
    this.inputText = inputText;
    this.tokens = [];
    this.tokenTypes = [
      // TODO: lexer crashes when putting decimal. could fix regex?
      { type: "number", regex: /^\d+/ },
      { type: "plusToken", regex: /^\+/ },
      { type: "minusToken", regex: /^\-/ },
      { type: "timesToken", regex: /^\*/ },
      { type: "divideToken", regex: /^\// },
      { type: "whitespace", regex: /^\s+/ },
      { type: "openBracketToken", regex: /^\(/ },
      { type: "closeBracketToken", regex: /^\)/ },
      { type: "unquotedString", regex: /^[a-zA-Z]+/ },
      { type: "assignmentOperator", regex: /^=/ },
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
          if (type === "unquotedString" && value === "let") {
            this.tokens.push(new Token("letKeyword", value));
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
    this.tokens.push(new Token("endOfFileToken", "\0"));
    for (let tokenIndex = 0; tokenIndex < this.tokens.length; tokenIndex++) {
      if (this.tokens[tokenIndex].tokenType === "whitespace") {
        this.tokens.splice(tokenIndex, 1);
      }
    }
    return this.tokens;
  }
}

exports.Lexer = Lexer;
