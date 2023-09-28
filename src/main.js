/* 
Note: only concerned with integers for now
Input text - 1 + 3 => [1, ' ', +, ' ', 3]
Lexer - tokenises the input --- done
Parser - goes through the tokens and creates an abstract syntax tree (AST)
Analyse and calculate - use the AST and perform type checking and calculations/operations
*/

const readline = require('readline');
const { Lexer } = require('./Lexer');
const { Parser } = require('./Parser')

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

function prettyPrintTree(node, depth = 0, isLast = true, prefix = "") {
    let result = "";

    // Check if the node is an operator or a leaf node
    if (node.tokenType && node.tokenValue) {
        const nodeValue = `${node.tokenType}: ${node.tokenValue}`;
        const branchSymbol = isLast ? "└── " : "├── ";

        // Print the current node
        result += prefix + branchSymbol + nodeValue + "\n";
    } else {
        // Node is an operator
        const operatorValue = node.operator
            ? `${node.operator.tokenType}: ${node.operator.tokenValue}`
            : "undefined";
        const branchSymbol = isLast ? "└── " : "├── ";

        // Print the operator node
        result += prefix + branchSymbol + operatorValue + "\n";
    }

    const children = [node.left, node.right];

    // Recursively print the child nodes
    children.forEach((child, index) => {
        if (child) {
            const newPrefix = prefix + (isLast ? "    " : "│   ");
            const newIsLast = index === children.length - 1;
            result += prettyPrintTree(child, depth + 1, newIsLast, newPrefix);
        }
    });

    return result;
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
        console.log(prettyPrintTree(ast))
    }
}

main()

