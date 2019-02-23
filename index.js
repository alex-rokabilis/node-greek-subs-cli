#!/usr/bin/env node
const meow = require('meow');
const pkg = require('./package.json')

const cli = meow(`
	Usage
	  $ ${Object.keys(pkg.bin)[0]} <input>

	Options
	  --timer, -t  Measure process time execution

	Examples
	  $ ${Object.keys(pkg.bin)[0]} "Spiderman 1 2002 1080p x264.mkv"
	  $ ${Object.keys(pkg.bin)[0]} "/home/Videos/Spiderman 1 (2002) 1080p x264"
`, {
        flags: {
            timer: {
                type: 'boolean',
                alias: 't',
                default: true,
            }
        }
    });
if (cli.input.length === 0) {

    cli.showHelp();

} else {

    require('./main')(cli.input[0], cli.flags)
}
