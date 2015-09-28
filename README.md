# node-mysql-util
A MySQL utility for node.js

Personal MySQL utility for _mysql_ for Node.JS

This package allows you to perform basic CRUD MySQL operations.

## Installation

```
npm install -g node-mysql-util
```

``` javascript
var db = require('node-mysql-util'),
	opts = {
		table: 'tbl_posts'
	};
```

## Example and Usage

``` javascript

//SELECT ALL
db.select(opts, function(err, rows) {
	//SELECT * FROM tbl_posts WHERE 1
});

//SELECT ONE
opts.where = { post_id: 3 };

db.select(opts, function(err, rows) {
	//SELECT * FROM tbl_posts WHERE 'post_id' = 3
});

//INSERT
var data = {
	post_title: "Hello, World!",
	post_content: "Bacon Ipsum"
};

db.insert(opts.table, data, function(err, rows) {
	// INSERT INTO tbl_posts SET ? data
});
```
## Notes

This package is for basic operations for now.

## Future Development

- Stored procedures
- Complex queries

# LICENSE

Copyright (c) 2015 Dexter Brylle Matos

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.