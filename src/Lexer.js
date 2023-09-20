class Lexer {
    constructor(inputText) {
        this.inputText = inputText;
        this.tokens = [];
        this.tokenTypes = [
            {type: 'number', regex: /^\d+/},
            {type: 'binaryOperator', regex: /^[+\-*/]/},
            {type: 'whitespace', regex: /^\s+/}
        ];
    }

    tokenize() {
        console.log(this.inputText);
        let currentIndex = 0;
        while (currentIndex < this.inputText.length) {
            let matchedToken = null;

            for (const tokenType of this.tokenTypes) {
                const regexResult = this.inputText.slice(currentIndex).match(tokenType.regex);

                if (regexResult && regexResult.index === 0) {
                    const value = regexResult[0];
                    const type = tokenType.type;
                    this.tokens.push({tokenType: type, tokenValue: value});
                    currentIndex += value.length;
                    matchedToken = type;
                    break;
                }
            }

            if (!matchedToken) {
                console.log(`Error: unrecognised token: ${this.inputText.slice(currentIndex)}`);
                return;
            }
        }
        console.log(this.tokens)
        return this.tokens;
    }
}

exports.Lexer = Lexer