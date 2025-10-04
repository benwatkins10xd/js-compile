import { createInterface } from "node:readline";
import { Compiler } from "./compiler.js";
import { stdin, stdout } from "node:process";
import { CompilerError } from "./structs/errors.js";

async function getStdin() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });

  return new Promise((resolve) => {
    rl.question("> ", (input) => {
      rl.close();
      resolve(input);
    });
  });
}

async function main() {
  let showTokens = false;
  let showAst = false;
  let variables = {};

  while (true) {
    const input = await getStdin();
    if (input === "#quit") {
      console.log("Exiting");
      break;
    } else if (input === "#clear") {
      console.clear();
      process.stdout.write("> ");
      continue;
    } else if (input === "#tokens") {
      showTokens = !showTokens;
      console.log(showTokens ? "Showing tokens" : "Hiding tokens");
      continue;
    } else if (input === "#ast") {
      showAst = !showAst;
      console.log(showAst ? "Showing AST" : "Hiding AST");
      continue;
    } else if (input === "") {
      continue;
    } // add more commands

    try {
      const compiler = new Compiler(variables);
      console.log(compiler.compile(input));

      // optional debugging
      if (showAst) {
        console.log(JSON.stringify(compiler.ast, null, 2));
      } else if (showTokens) {
        console.log(compiler.tokens);
      }
    } catch (error) {
      if (error instanceof CompilerError) {
        console.error(error.toString()); // hide stack trace
        continue;
      } else {
        console.error(error); // unexpected error - break
        break;
      }
    }
  }
}

main();
