class SyntaxNode {
    constructor() {
        if (this.constructor === SyntaxNode) {
            throw new Error("Cant instantiate this");
        }
    }
}

class BinaryExpression extends SyntaxNode {
    constructor(leftToken, operatorToken, rightToken) {
        super()
        this.leftToken = leftToken
        this.operatorToken = operatorToken
        this.rightToken = rightToken
    }
}

exports.SyntaxNode = SyntaxNode
exports.BinaryExpression = BinaryExpression