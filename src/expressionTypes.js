class SyntaxNode {
  constructor() {
    if (this.constructor === SyntaxNode) {
      throw new Error("Cant instantiate this");
    }
  }
}

class BinaryExpression extends SyntaxNode {
  constructor(leftToken, operatorToken, rightToken) {
    super();
    this.leftToken = leftToken;
    this.operatorToken = operatorToken;
    this.rightToken = rightToken;
  }
}

class VariableAssignment extends SyntaxNode {
  constructor(variableName, identifierToken, variableValue) {
    super();
    this.variableName = variableName;
    this.identifierToken = identifierToken;
    this.variableValue = variableValue;
  }
}

class VariableAccess extends SyntaxNode {
  constructor(variableName) {
    super();
    this.variableName = variableName;
  }
}

class ParenthesisedExpression extends SyntaxNode {
  constructor(leftBracket, expression, rightBracket) {
    super();
    this.leftBracket = leftBracket;
    this.expression = expression;
    this.rightBracket = rightBracket;
  }
}

exports.SyntaxNode = SyntaxNode;
exports.BinaryExpression = BinaryExpression;
exports.VariableAssignment = VariableAssignment;
exports.VariableAccess = VariableAccess;
exports.ParenthesisedExpression = ParenthesisedExpression;
