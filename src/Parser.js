class Parser {
    #tokens
    #position
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
        console.log(`Parser error: bad token type: ${this.#currentToken().tokenType}, expected: ${type}`);
        return;
    }

    #nextToken() {
        let current = this.#currentToken();
        this.#position++;
        return current;
    }

    #parseBinaryExpression() {
        return this.#match('number');
    }

    parse() {
        // match a number token
        let leftToken = this.#parseBinaryExpression();
        while (this.#currentToken().tokenType === 'plusToken' ||
            this.#currentToken().tokenType === 'minusToken') {
            let operatorToken = this.#nextToken();
            let rightToken = this.#parseBinaryExpression();
            leftToken = {
                left: leftToken,
                operator: operatorToken,
                right: rightToken
            };
        }
        return leftToken;
    }
}

exports.Parser = Parser
