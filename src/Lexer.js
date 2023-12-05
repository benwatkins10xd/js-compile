class Lexer {
    constructor(inputText) {
        this.inputText = inputText;
        this.tokens = [];
        this.tokenTypes = [
            // TODO: lexer crashes when putting decimal. could fix regex?
            { type: 'number', regex: /^\d+/ },
            { type: 'plusToken', regex: /^\+/ },
            { type: 'minusToken', regex: /^\-/ },
            { type: 'timesToken', regex: /^\*/ },
            { type: 'divideToken', regex: /^\// },
            { type: 'whitespace', regex: /^\s+/ }
        ];
    }

    tokenize() {
        let currentIndex = 0;
        while (currentIndex < this.inputText.length) {
            let matchedToken = null;

            for (const tokenType of this.tokenTypes) {
                const regexResult = this.inputText.slice(currentIndex).match(tokenType.regex);

                if (regexResult && regexResult.index === 0) {
                    const value = regexResult[0];
                    const type = tokenType.type;
                    this.tokens.push({ tokenType: type, tokenValue: value });
                    currentIndex += value.length;
                    matchedToken = type;
                    break;
                }
            }

            if (!matchedToken) {
                console.log(`Lexer error: unrecognised token: ${this.inputText.slice(currentIndex)}`);
                return;
            }
        }
        this.tokens.push({ tokenType: 'endOfFileToken', tokenValue: '\0' });
        for (let tokenIndex = 0; tokenIndex < this.tokens.length; tokenIndex++) {
            if (this.tokens[tokenIndex].tokenType === 'whitespace') {
                this.tokens.splice(tokenIndex, 1);
            }
        }
        return this.tokens;
    }
}

exports.Lexer = Lexer