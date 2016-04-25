var fs = require('fs');
var commands = require('./commands');

// Output a prompt
process.stdout.write('prompt > ');


// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim(),
			args = cmdString.split(/\s(?:\|\s)*/g);
  if (args.length === 3) {
  	commands[args[0]](null, args.slice(1,2))
  	commands[args[2]](process.stdin, [])
  }
  else {
  	commands[args[0]](null, args.slice(1));
  }
});