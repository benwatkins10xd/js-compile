import {
  BinaryExpression,
  ParenthesisedExpression,
  VariableAssignment,
  VariableAccess,
  BooleanExpression,
} from "./structs/expression-types.js";
import { EvaluatorError } from "./structs/errors.js";
import { NUMBER_TOKEN_TYPE } from "./constants/token-types.js";
export class Evaluator {
  constructor(variables) {
    this.operations = {
      "+": (left, right) => left + right,
      "-": (left, right) => left - right,
      "*": (left, right) => left * right,
      "/": (left, right) => left / right,
      "%": (left, right) => left % right,
      "^": (left, right) => left ** right,
    };
    this.variables = variables;
  }

  evaluate(ast) {
    // handle brackets
    if (ast instanceof ParenthesisedExpression) {
      ast = ast.expression;
    }
    // handle variable assignments
    if (ast instanceof VariableAssignment) {
      const value = this.evaluate(ast.variableValue);
      this.variables[ast.variableName.tokenValue] = value;
      return value;
    }
    // handle variable accesses
    if (ast instanceof VariableAccess) {
      if (this.variables[ast.variableName] !== undefined) {
        return this.variables[ast.variableName];
      } else {
        throw new EvaluatorError(
          `Error: variable {${ast.variableName}} is not defined.`
        );
      }
    }

    if (ast instanceof BooleanExpression) {
      return ast.value;
    }

    // handle binary operations
    if (ast instanceof BinaryExpression) {
      const left = this.evaluate(ast.leftToken);
      const right = this.evaluate(ast.rightToken);
      const operator = ast.operatorToken.tokenValue;

      if (this.operations[operator]) {
        return this.operations[operator](left, right);
      } else {
        throw new EvaluatorError(`Unsupported operator: ${operator}`);
      }
    } else if (ast.tokenType === NUMBER_TOKEN_TYPE) {
      return parseFloat(ast.tokenValue);
    } else {
      throw new EvaluatorError(`Unsupported syntax node: ${ast.tokenType}`);
    }
  }
}
