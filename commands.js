var fs = require('fs');
var request = require('request');
module.exports = {
	
	pwd: function(stdin, args) {
	  process.stdout.write(process.cwd());
		process.stdout.write('\nprompt > ');
	},
	
	date: function(stdin, args) {
		var d = new Date();
  	process.stdout.write(d.toString().trim());
		process.stdout.write('\nprompt > ');
	},
	
	ls: function(stdin, args) {
  	fs.readdir('.', function(err, files) {
	  	if (err) throw err;
		  files.forEach(function(file) {
		    process.stdout.write(file.toString() + "\n");
		  });
			process.stdout.write('prompt > ');
		});
	},
	
	echo: function(stdin, args) {
		var arrStr = args.join(' ');
		process.stdout.write(arrStr);
		process.stdout.write('\nprompt > ');
	},
	
	print: function(fileName, fnName, numOfLines) {
		var fileName = process.cwd().split("\\").join("/") + '/' + fileName;
		fs.readFile(fileName, 'utf8', function(err, data) {
			if (err) throw err;
			if (fnName === 'head')
				data = data.split('\n').slice(0,numOfLines).join('\n');
			else if (fnName === 'tail')
				data = data.split('\n').slice(-numOfLines).join('\n');
			process.stdout.write(data);
			process.stdout.write('\nprompt > ');
		});
	},

	cat: function(stdin, args) {
		this.print(args[0], 'cat', 0);
	},
	
	head: function (stdin, args) {
		this.print(args[0], 'head', 5);
	},
	
	tail: function (stdin, args) {
		this.print(args[0], 'tail', 5);
	},

	curl: function(stdin, args) {
		var url = args[0];
		if (!url.match(/https?:\/\/www./)) {
			url = 'https://www.' + url;
		}
		request(url, function(err, response, body) {
			if (err) throw err;
			if (response.statusCode == 200) {
				process.stdout.write(body);
			}
			process.stdout.write('\nprompt > ');
		});
	}
}