const program = require('commander')

program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza', 'pizza');

const re = program.parse(process.argv);
console.log(re.opts())


/**
 * https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md
 */