/* 
Note: only concerned with integers for now
Input text - 1 + 3 => [1, ' ', +, ' ', 3]
Lexer - tokenises the input --- done
Parser - goes through the tokens and creates an abstract syntax tree (AST)
Analyse and calculate - use the AST and perform type checking and calculations/operations
*/

const readline = require('readline');
const { Lexer } = require('./Lexer');
const { Parser } = require('./Parser');

const { Evaluator } = require('./Evaluator')

async function getStdin() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('> ', (input) => {
            rl.close();
            resolve(input);
        });
    });
}




async function main() {
    let showTokens = false;

    while (true) {
        const input = await getStdin();
        if (input === '#quit') {
            console.log("Exiting");
            break;
        } else if (input === '#clear') {
            console.clear();
            process.stdout.write("> ")
            continue;
        } else if (input === '#tokens') {
            showTokens = !showTokens;
            console.log(showTokens ? 'Showing tokens' : 'Hiding tokens');
            continue;
        }

        // add more commands

        let lexer = new Lexer(input);
        let tokens = lexer.tokenize()
        if (showTokens) {
            console.log(tokens);
        }
        let parser = new Parser(tokens);
        let ast = parser.parse();
        // console.log(JSON.stringify(ast, null, 4))

        let evaluator = new Evaluator();
        let result = evaluator.evaluate(ast)
        console.log(result);
    }
}

main()

