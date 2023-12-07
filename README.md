# js-compile - open to name suggestions

Recording this as a YouTube series here: [YouTube Playlist](https://youtube.com/playlist?list=PLKddWTBxzVCLRCltbWZxCyKm3IqkjEsBw&si=RclBs9DIxojZ3Qwy)

This is my implementation of a basic compiler in vanilla JavaScript. Doing this without type safety is a bit of a struggle so it's better to use TypeScript, but we don't do that around here.

This compiler has three main stages:
1. Lexing - tokenizes the user's input
2. Parsing - creates an abstract syntax tree (AST) from the list of tokens
3. Evaluating - walking the AST and calculating any results.

The main goal for this project is to create a working expression evaluator, do variable assignments and maybe some control structures like for loops or while loops. We also want to have some unit tests to make sure we're not breaking anything.

## Prerequisites

- Node.js installed ([NodeJS downloads](https://nodejs.org/en/download))
- Bit of patience (if you're working with the code)

## Installation

1. Clone this repo: `git clone https://github.com/benwatkins10xd/js-compile.git` (or download as a .zip)

2. Change into the root directory: `cd js-compile`

3. Run the compiler by running node on the entrypoint: `node src/main.js`

## Contributing

Contributions/improvements are always welcome. Please create a branch off main and make any changes there, then create a pull request!
