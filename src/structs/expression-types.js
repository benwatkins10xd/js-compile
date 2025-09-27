export class SyntaxNode {
  constructor() {
    if (this.constructor === SyntaxNode) {
      throw new Error("Cant instantiate this");
    }
  }
}

export class BinaryExpression extends SyntaxNode {
  constructor(leftToken, operatorToken, rightToken) {
    super();
    this.leftToken = leftToken;
    this.operatorToken = operatorToken;
    this.rightToken = rightToken;
  }
}

export class VariableAssignment extends SyntaxNode {
  constructor(variableName, identifierToken, variableValue) {
    super();
    this.variableName = variableName;
    this.identifierToken = identifierToken;
    this.variableValue = variableValue;
  }
}

export class VariableAccess extends SyntaxNode {
  constructor(variableName) {
    super();
    this.variableName = variableName;
  }
}

export class ParenthesisedExpression extends SyntaxNode {
  constructor(leftBracket, expression, rightBracket) {
    super();
    this.leftBracket = leftBracket;
    this.expression = expression;
    this.rightBracket = rightBracket;
  }
}

export class BooleanExpression extends SyntaxNode {
  constructor(value) {
    super();
    this.value = value;
  }
}
