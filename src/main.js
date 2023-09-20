/* 
Note: only concerned with integers for now
Input text - 1 + 3 => [1, ' ', +, ' ', 3]
Lexer - tokenises the input 
Parser - goes through the tokens and creates an abstract syntax tree (AST)
Analyse and calculate - use the AST and perform type checking and calculations/operations
1 + 3 => 4
*/

const readline = require('readline');
const {Lexer} = require('./Lexer');

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
    while (true) {
        const input = await getStdin();
        if (input === '#quit') {
            console.log("Exiting");
            break;
        } else if (input === '#clear') {
            console.clear();
            process.stdout.write("> ")
            continue;
        } // add more commands
        
        let lexer = new Lexer(input);
        lexer.tokenize()
    }
}

main()

