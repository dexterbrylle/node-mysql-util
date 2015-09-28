var mysql = require('mysql'),
	config = require('../config');

//See config.js
var pool = mysql.createPool({
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.db,
	connectionLimit: config.mysql.connectionLimit,
	supportBigNumbers: true
});

var whereEscape = function(values) {
	if ((typeof values) !== 'object') {
		throw new Error('Can only escape objects');
	}

	var conds = [],
		key = '',
		count = 0;

	for (var key in values) {
		if (values.hasOwnProperty(key)) {
			count += 1;
			conds.push(mysql.escapeId(key) + ' = ' + mysql.escape(values[key]));
		}
	}
	if (count == 0)
		return '1';
	return conds.join(' AND ');
};

exports.select = function(opts, cb) {
	var query = ('undefined' === typeof opts.selector) ? "SELECT *" + " FROM " + mysql.escapeId(opts.table) :
		"SELECT " + mysql.escapeId(opts.selector) + " FROM " + mysql.escapeId(opts.table);


	typeof opts.where !== 'undefined' ? query += " WHERE " + whereEscape(opts.where) : query += " WHERE 1";

	pool.getConnection(function(err, connection) {
		if (err) {
			console.error(err);
			cb(true);
			return;
		}
		console.log("SEL Query -> " + query);
		connection.query(query, function(err, results) {
			if (err) {
				console.error(err);
				cb(true);
				return;
			}
			connection.release();
			cb(false, results);
		});
	});
};

exports.insert = function(table, data, cb) {
	if (!data)
		console.error('EMPTY DATA');

	var query = "INSERT INTO " + mysql.escapeId(table) + " SET ?";

	pool.getConnection(function(err, connection) {
		if (err) {
			console.error(err);
			cb(true);
			return;
		}
		console.log("INS Query -> " + query + " " + data);
		connection.query(query, data, function(err, results) {
			if (err) {
				console.error(err);
				cb(true);
				return;
			}
			connection.release();
			cb(false, results);
		});
	});
};

exports.update = function(opts, data, cb) {
	if (!data)
		console.error('EMPTY DATA!');

	var query = "UPDATE " + mysql.escapeId(opts.table) + " SET ?";

	typeof opts.where !== 'undefined' ? query += " WHERE " + whereEscape(opts.where) : query += " WHERE 1";

	pool.getConnection(function(err, connection) {
		if (err) {
			console.error(err);
			cb(true);
			return;
		}
		console.log("UPD Query -> " + query + " " + data);
		connection.query(query, data, function(err, results) {
			if (err) {
				console.error(err);
				cb(true);
				return;
			}
			connection.release();
			cb(false, results);
		});
	});
};

exports.delete = function(opts, cb) {
	var query = ('undefined' === typeof opts.table) ? console.log("SQL Syntax error. No table defined!") : "DELETE FROM " + mysql.escapeId(opts.table);

	typeof opts.where !== 'undefined' ? query += " WHERE " + whereEscape(opts.where) : query += " WHERE 1";

	pool.getConnection(function(err, connection) {
		if (err) {
			console.error(err);
			cb(true);
			return;
		}
		console.log("DEL Query -> " + query)
		connection.query(query, function(err, results) {
			if (err) {
				console.error(err);
				cb(true);
				return;
			}
			connection.release();
			cb(false, results);
		});
	});
};