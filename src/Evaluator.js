const { BinaryExpression } = require("./expressionTypes")

class Evaluator {
    constructor() {
        this.operations = {
            "+": (left, right) => left + right,
            "-": (left, right) => left - right,
            "*": (left, right) => left * right,
            "/": (left, right) => left / right
        }
    }

    evaluate(ast) {
        if (ast instanceof BinaryExpression) {
            const left = this.evaluate(ast.leftToken)
            const right = this.evaluate(ast.rightToken)
            const operator = ast.operatorToken.tokenValue

            if (this.operations[operator]) {
                return this.operations[operator](left, right)
            } else {
                throw new Error(`Unsupported operator: ${operator}`)
            }
        } else if (ast.tokenType === 'number') {
            return parseFloat(ast.tokenValue);
        } else {
            throw new Error(`Unsupported syntax node: ${ast.tokenType}`);
        }
    }
}

exports.Evaluator = Evaluator